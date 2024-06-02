import { getAllAvailableProducts } from "@/actions/products";
import { ProductCardSkeleton } from "@/components/products/ProductSkeleton";
import { ProductsList } from "@/components/products/ProductsList";
import React, { Suspense } from "react";

const ProductsPage = () => {
  return (
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
        <ProductsList
          productFetcher={getAllAvailableProducts}
        />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
