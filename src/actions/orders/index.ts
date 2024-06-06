"use server";

import db from "../../../db";

export const getSalesData = async () => {
  const data = await db.order.aggregate({
    _count: true,
    _sum: { pricePaidInCens: true },
  });

  console.log("res", data);

  return {
    amount: data._sum.pricePaidInCens || 0,
    count: data._count,
  };
};

export const userOrderExists = async (
  email: string,
  productId: string
) => {
  const order = await db.order.findFirst({
    where: {
      user: {
        email,
      },
      productId,
    },
    select: {
      id: true,
    },
  });

  console.log("order", order);

  return !!order;
};
