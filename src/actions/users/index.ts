"use server";

import db from "../../../db";

export const getUserData = async () => {
  const [userCount, totalSales] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: {
        pricePaidInCents: true,
      },
    }),
  ]);

  const avg = totalSales._sum.pricePaidInCents
    ? totalSales._sum.pricePaidInCents / userCount
    : 0;

  return {
    totalUsers: userCount,
    averageValuePerUser: avg,
  };
};

export const getUserIdByEmail = async (email: string) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return user?.id;
};

export const getUsers = async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
      email: true,
      orders: {
        select: {
          pricePaidInCents: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};

export const deleteUser = async (userId: string) => {
  const deletedUser = await db.user.delete({
    where: {
      id: userId,
    },
  });

  return deletedUser;
};
