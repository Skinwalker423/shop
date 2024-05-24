"use server";

import { z } from "zod";

import db from "../../../db";
import fs from "fs/promises";

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
  const data = await db.product.findMany({});
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

export const addProduct = async (formData: FormData) => {
  const parsed = addProductSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  console.log("parsed data", parsed.error);

  if (parsed.error) {
    return {
      error: parsed.error.message,
    };
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
      filePath,
      Buffer.from(await data.image.arrayBuffer())
    );

    db.product.create({
      data: {
        name: data.name,
        description: data.description,
        priceInCents: data.price,
        filePath,
        imagePath,
      },
    });

    return {
      success: "Successfully added product",
    };
  }

  // const data = await db.product.create({
  //   data: {
  //     name,

  //   }
  // });
  // return data;
};
