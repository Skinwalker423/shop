import { getProductById } from "@/actions/products";
import React from "react";

const ProductEditPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  console.log("params", params.productId);

  const product = await getProductById(params.productId);

  console.log("product", product);

  return <div>ProductEditPage</div>;
};

export default ProductEditPage;
