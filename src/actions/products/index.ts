"use server";

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

export const addProduct = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  if (!name) return;

  console.log("form data", formData);
  console.log("name", name);

  // const data = await db.product.create({
  //   data: {
  //     name,

  //   }
  // });
  // return data;
};
