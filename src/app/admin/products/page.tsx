import Link from "next/link";

import { EllipsisVertical } from "lucide-react";
import { PageHeader } from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProducts } from "@/actions/products";
import { formatCurrency } from "@/lib/formatter";

const ProductsPage = async () => {
  const products = await getAllProducts();

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
      <Table>
        <TableCaption>
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-0'>
              <span className='sr-only'>
                Available for purchase
              </span>
            </TableHead>
            <TableHead className=''>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead className='w-0'>
              <span className='sr-only'>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 &&
            products.map((product) => {
              return (
                <TableRow>
                  <TableCell className='font-medium'>
                    {product.isAvailableForPurchase
                      ? "✅"
                      : "❎"}
                  </TableCell>
                  <TableCell className='font-medium'>
                    {product.name}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(product.priceInCents)}
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell className='font-medium'>
                    <Button variant={"outline"} size={"sm"}>
                      <EllipsisVertical />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductsPage;
