"use server";

import db from "../../../db";

export const getSalesData = async () => {
  const data = await db.order.aggregate({
    _count: true,
    _sum: { pricePaidInCents: true },
  });

  console.log("res", data);

  return {
    amount: data._sum.pricePaidInCents || 0,
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

interface CreateOrderProps {
  productId: string;
  email: string;
  pricePaidInCents: number;
}

export const createOrderAndUpsertUser = async ({
  productId,
  email,
  pricePaidInCents,
}: CreateOrderProps) => {
  const userFields = {
    email,
    orders: {
      create: {
        pricePaidInCents,
        productId,
      },
    },
  };

  const updatedUserOrder = await db.user.upsert({
    where: {
      email,
    },
    create: userFields,
    update: userFields,
    select: {
      orders: {
        orderBy: {
          createdAt: "asc",
        },
        take: 1,
      },
    },
  });

  return updatedUserOrder.orders[0];
};
