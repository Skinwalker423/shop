"use client";

import type { Product } from "@prisma/client";
import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "./PaymentForm";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface CheckoutFormProps {
  product: Product;
  clientSecret: string;
}

export const CheckoutForm = ({
  product,
  clientSecret,
}: CheckoutFormProps) => {
  return (
    <div className='max-w-5xl mx-auto w-full space-y-8'>
      <div className='flex gap-4 items-center'>
        <div className='aspect-video w-1/3 flex-shrink-0 relative'>
          <Image
            src={product.imagePath}
            alt={`product image of ${product.name}`}
            fill
          />
        </div>
      </div>
      <Elements
        options={{
          clientSecret,
          appearance: {
            theme: "stripe",
          },
        }}
        stripe={stripePromise}
      >
        <PaymentForm clientSecret={clientSecret} />
      </Elements>
    </div>
  );
};
