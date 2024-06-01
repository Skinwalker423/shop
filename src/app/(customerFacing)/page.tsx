import {
  getNewestProducts,
  getPopularProducts,
} from "@/actions/products";
import { ProductCardSkeleton } from "@/components/ProductSkeleton";
import { ProductsList } from "@/components/ProductsList";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const ClientHomePage = () => {
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

const ProductsGridSection = ({
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

export default ClientHomePage;

// interface ProductsListProps {
//   productFetcher: () => Promise<Product[]>;
// }

// const ProductsList = async ({
//   productFetcher,
// }: ProductsListProps) => {
//   const products = await productFetcher();
//   const productsList = products.map((product) => {
//     return (
//       <ProductCard key={product.id} product={product} />
//     );
//   });

//   return productsList;
// };
