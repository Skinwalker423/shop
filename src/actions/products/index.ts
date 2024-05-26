"use server";

import { z } from "zod";

import db from "../../../db";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";

export const getProductsdata = async () => {
  const [activeProducts, inactiveProducts] =
    await Promise.all([
      db.product.count({
        where: {
          isAvailableForPurchase: true,
        },
      }),
      db.product.count({
        where: {
          isAvailableForPurchase: false,
        },
      }),
    ]);

  return {
    activeProducts,
    inactiveProducts,
  };
};

export const getAllProducts = async () => {
  const data = await db.product.findMany({
    select: {
      name: true,
      isAvailableForPurchase: true,
      id: true,
      priceInCents: true,
      _count: { select: { orders: true } },
    },
    orderBy: {
      name: "asc",
    },
  });
  return data;
};

const fileSchema = z.instanceof(File, {
  message: "file required",
});

const imageSchema = fileSchema.refine(
  (file) =>
    file.size === 0 || file.type.startsWith("image/")
);

const addProductSchema = z.object({
  name: z.string().min(1, {
    message: "must enter a name",
  }),
  price: z
    .number()
    .int({
      message: "not a valid price",
    })
    .min(1),
  description: z.string(),
  file: fileSchema.refine(
    (file) => file.size > 0,
    "Required"
  ),
  image: imageSchema,
});

export const addProduct = async (
  previousState: unknown,
  formData: FormData
) => {
  const name = formData.get("name")?.toString();
  const price = formData.get("price")?.toString() || "";
  const description = formData
    .get("description")
    ?.toString();

  const file = formData.get("file");
  const image = formData.get("image");

  const parsed = addProductSchema.safeParse({
    name,
    price: parseInt(price),
    description,
    file,
    image,
  });

  console.log("parsed data", parsed.error);

  if (parsed.error) {
    return parsed.error.formErrors.fieldErrors;
  }

  if (parsed.success) {
    const data = parsed.data;

    await fs.mkdir("products", { recursive: true });
    const filePath = `products/${crypto.randomUUID()}-${
      data.file.name
    }`;
    await fs.writeFile(
      filePath,
      Buffer.from(await data.file.arrayBuffer())
    );

    await fs.mkdir("public/products", { recursive: true });
    const imagePath = `/products/${crypto.randomUUID()}-${
      data.image.name
    }`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );

    await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        priceInCents: data.price,
        filePath,
        imagePath,
        isAvailableForPurchase: false,
      },
    });

    redirect("/admin/products");
  }

  // const data = await db.product.create({
  //   data: {
  //     name,

  //   }
  // });
  // return data;
};

export const toggleProductAvailability = async (
  id: string,
  isAvailableForPurchase: boolean
): Promise<void> => {
  await db.product.update({
    where: {
      id,
    },
    data: {
      isAvailableForPurchase,
    },
  });
};

export const deleteProductById = async (id: string) => {
  const product = await db.product.delete({
    where: {
      id,
    },
  });

  if (!product) return notFound();
};
