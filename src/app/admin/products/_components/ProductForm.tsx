"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatter";
import {
  addProduct,
  updateProduct,
} from "@/actions/products";
import { useFormState, useFormStatus } from "react-dom";
import type { Product } from "@prisma/client";
import Image from "next/image";

interface ProductFormProps {
  product?: Product | null;
}

export const ProductForm = ({
  product,
}: ProductFormProps) => {
  const productAction = product
    ? updateProduct.bind(null, product.id)
    : addProduct;

  const [priceInCents, setPriceInCents] = useState<number>(
    product?.priceInCents || 0
  );
  const [error, action] = useFormState(productAction, {});

  return (
    <form action={action} className='space-y-8'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          name='name'
          type='text'
          required
          defaultValue={product?.name || ""}
        />
        {error?.name && <div>{error.name}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='price'>Price in cents</Label>
        <Input
          id='price'
          name='price'
          type='number'
          required
          value={priceInCents}
          onChange={(e) =>
            setPriceInCents(Number(e.target.value) || 0)
          }
        />
        {error?.price && <div>{error.price}</div>}
        <div className='text-muted-foreground'>
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
      </div>
      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          name='description'
          required
          placeholder='A short description of the product to add'
          defaultValue={product?.description || ""}
        />
        {error?.description && (
          <div>{error.description}</div>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='file'>File</Label>
        <Input
          type='file'
          id='file'
          name='file'
          required={product == null}
        />
        {product?.filePath && (
          <p className='text-muted-foreground'>
            {product.filePath}
          </p>
        )}
        {error?.file && <div>{error.file}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='image'>Image</Label>
        <Input
          type='file'
          id='image'
          name='image'
          required={product == null}
        />
        {product?.imagePath && (
          <Image
            src={product.imagePath}
            alt='product image'
            width={400}
            height={400}
            className='w-auto'
            priority
          />
        )}
        {error?.image && <div>{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type='submit'>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
};
