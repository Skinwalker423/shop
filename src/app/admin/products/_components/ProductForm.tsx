"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatter";
import { addProduct } from "@/actions/products";

export const ProductForm = () => {
  const [priceInCents, setPriceInCents] =
    useState<number>();

  const onSubmit = () => {};

  return (
    <form action={addProduct} className='space-y-8'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Name</Label>
        <Input id='name' name='name' type='text' required />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='price'>Price in cents</Label>
        <Input
          id='price'
          name='price'
          type='number'
          required
          onChange={(e) =>
            setPriceInCents(
              Number(e.target.value) || undefined
            )
          }
        />
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
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='file'>File</Label>
        <Input type='file' id='file' name='file' required />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='image'>Image</Label>
        <Input
          type='file'
          id='image'
          name='image'
          required
        />
      </div>

      <Button type='submit'>Add</Button>
    </form>
  );
};
