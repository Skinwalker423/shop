import type { Product } from "@prisma/client";
import React from "react";
import { ProductCard } from "./ProductCard";

interface ProductsListProps {
  productFetcher: () => Promise<Product[]>;
}

export const ProductsList = async ({
  productFetcher,
}: ProductsListProps) => {
  const products = await productFetcher();

  await new Promise((res) => setTimeout(res, 5000));

  const productsList = products.map((product) => {
    return (
      <ProductCard key={product.id} product={product} />
    );
  });

  return productsList;
};
