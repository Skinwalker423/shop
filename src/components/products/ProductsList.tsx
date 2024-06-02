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

  const productsList = products.map((product) => {
    return (
      <ProductCard key={product.id} product={product} />
    );
  });

  return productsList;
};
