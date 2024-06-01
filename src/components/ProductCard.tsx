import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatter";
import type { Product } from "@prisma/client";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

interface ProductCard {
  product: Product;
}

export const ProductCard = ({ product }: ProductCard) => {
  return (
    <Card className='flex flex-col overflow-hidden '>
      <div className='relative w-full h-auto aspect-video'>
        <Image
          src={product.imagePath}
          alt='product image'
          fill
        />
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          {formatCurrency(product.priceInCents / 100)}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='line-clamp-4'>
          {product.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className='w-full'
          size={"lg"}
          variant={"destructive"}
          asChild
        >
          <Link href={`/products/${product.id}/purchase`}>
            Purchase
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
