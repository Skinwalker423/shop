import type { Product } from "@prisma/client";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { ProductsList } from "./ProductsList";
import { ProductCardSkeleton } from "./ProductSkeleton";

interface ProductsGridSectionProps {
  productFetcher: () => Promise<Product[]>;
  title: string;
}

export const ProductsGridSection = ({
  productFetcher,
  title,
}: ProductsGridSectionProps) => {
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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductsList productFetcher={productFetcher} />
        </Suspense>
      </div>
    </section>
  );
};
