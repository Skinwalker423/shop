import Link from "next/link";

import { PageHeader } from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "./_components/ProductsTable";

const ProductsPage = async () => {
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
      <ProductsTable />
    </>
  );
};

export default ProductsPage;
