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
};

const updateProductSchema = addProductSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export const updateProduct = async (
  id: string,
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

  const parsed = updateProductSchema.safeParse({
    name,
    price: parseInt(price),
    description,
    file,
    image,
  });

  if (parsed.error) {
    return parsed.error.formErrors.fieldErrors;
  }

  if (parsed.success) {
    const data = parsed.data;

    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (product == null) return notFound();

    let filePath = product.filePath;
    let imagePath = product.imagePath;

    if (data.file != null && data.file?.size > 0) {
      await fs.unlink(product.filePath);
      await fs.mkdir("products", { recursive: true });
      filePath = `products/${crypto.randomUUID()}-${
        data.file.name
      }`;
      await fs.writeFile(
        filePath,
        Buffer.from(await data.file.arrayBuffer())
      );
    }

    if (data.image != null && data.image.size > 0) {
      await fs.unlink(`public${product.imagePath}`);
      await fs.mkdir("public/products", {
        recursive: true,
      });
      imagePath = `/products/${crypto.randomUUID()}-${
        data.image.name
      }`;
      await fs.writeFile(
        `public${imagePath}`,
        Buffer.from(await data.image.arrayBuffer())
      );
    }

    await db.product.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        priceInCents: data.price,
        filePath,
        imagePath,
      },
    });

    redirect("/admin/products");
  }
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

  await fs.unlink(product.filePath);
  await fs.unlink(`public${product.imagePath}`);
};

export const getProductById = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) return notFound();

  return product;
};

export const getNewestProducts = async () => {
  const products = await db.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: {
      createdAt: "desc",
    },

    take: 10,
  });

  console.log("newest products", products);

  return products;
};
