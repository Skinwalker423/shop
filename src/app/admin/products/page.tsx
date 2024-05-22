import React from "react";
import { PageHeader } from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductsPage = () => {
  return (
    <>
      <div className='flex justify-between items-center gap-4'>
        <PageHeader>Admin Products Page</PageHeader>
        <Button asChild>
          <Link href={"/admin/product/new"}>
            Add Product
          </Link>
        </Button>
      </div>
    </>
  );
};

export default ProductsPage;
