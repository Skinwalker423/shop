"use server";

import db from "../../../db";

export const getUserData = async () => {
  const [userCount, totalSales] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: {
        pricePaidInCens: true,
      },
    }),
  ]);

  const avg = totalSales._sum.pricePaidInCens
    ? totalSales._sum.pricePaidInCens / userCount
    : 0;

  return {
    totalUsers: userCount,
    averageValuePerUser: avg,
  };
};
