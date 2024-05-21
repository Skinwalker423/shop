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
