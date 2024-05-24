"use server";

import { z } from "zod";

import db from "../../../db";

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
  file: fileSchema,
  image: fileSchema,
});

export const addProduct = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  if (!name) return;

  const parsed = addProductSchema.safeParse({
    name: name,
  });

  console.log("parsed data", parsed.error);

  if (parsed.error) {
    return {
      error: parsed.error.message,
    };
  }

  if (parsed.success) {
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
