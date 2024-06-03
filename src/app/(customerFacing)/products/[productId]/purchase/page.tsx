import { getProductById } from "@/actions/products";
import { notFound } from "next/navigation";
import React from "react";

const PurchasePage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  console.log("params", params);
  const product = await getProductById(params.productId);

  if (product == null) return notFound();

  return <div>PurchasePage {product.name}</div>;
};

export default PurchasePage;
