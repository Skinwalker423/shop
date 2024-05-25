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
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductsTable = async () => {
  const products = await getAllProducts();
  return (
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
              <TableRow key={product.id}>
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
  );
};
