import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllProducts } from "@/actions/products";
import { formatCurrency } from "@/lib/formatter";
import {
  CheckCircle2,
  EllipsisVertical,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "./ProductActionItems";

export const ProductsTable = async () => {
  const products = await getAllProducts();

  if (!products.length) return <p>No Products Found</p>;

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
                  {product.isAvailableForPurchase ? (
                    <>
                      <CheckCircle2 className='stroke-green-500' />
                      <span className='sr-only'>
                        Available
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className='stroke-destructive' />
                      <span className='sr-only'>
                        Not Available
                      </span>
                    </>
                  )}
                </TableCell>
                <TableCell className='font-medium'>
                  {product.name}
                </TableCell>
                <TableCell>
                  {formatCurrency(
                    product.priceInCents / 100 || 0
                  )}
                </TableCell>
                <TableCell>
                  {product._count.orders}
                </TableCell>
                <TableCell className='font-medium'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                      <span className='sr-only'>
                        More Options
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        Options
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <a
                          download
                          href={`/admin/products/${product.id}/download`}
                        >
                          Download
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                        >
                          Edit
                        </Link>
                      </DropdownMenuItem>

                      <ActiveToggleDropdownItem
                        id={product.id}
                        isAvailableForPurchase={
                          product.isAvailableForPurchase
                        }
                      />
                      <DropdownMenuSeparator />
                      <DeleteDropdownItem
                        id={product.id}
                        disabled={product._count.orders > 0}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
