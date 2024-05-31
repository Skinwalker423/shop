import {
  getNewestProducts,
  getPopularProducts,
} from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

const ClientHomePage = async () => {
  return (
    <main className='space-y-12'>
      <ProductsGridSection
        productFetcher={getNewestProducts}
        title='Newest'
      />
      <ProductsGridSection
        productFetcher={getPopularProducts}
        title='Most Popular'
      />
    </main>
  );
};

interface ProductsGridSectionProps {
  productFetcher: () => Promise<Product[]>;
  title: string;
}

const ProductsGridSection = async ({
  productFetcher,
  title,
}: ProductsGridSectionProps) => {
  const products = await productFetcher();
  if (!products) return null;
  const productsList = products.map((product) => {
    return <div key={product.id}>{product.name}</div>;
  });
  return (
    <section className='space-y-4'>
      <div className='flex gap-4 justify-between'>
        <h2 className='text-3xl'>{title}</h2>
        <Button variant={"outline"} asChild>
          <Link className='space-x-2' href={"/products"}>
            <span>View All</span>{" "}
            <ArrowRight className='size-4' />
          </Link>
        </Button>
      </div>
      <ul>{productsList}</ul>
    </section>
  );
};

export default ClientHomePage;
