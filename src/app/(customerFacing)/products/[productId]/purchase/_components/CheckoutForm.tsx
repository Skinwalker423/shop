"use client";

import type { Product } from "@prisma/client";
import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "./PaymentForm";

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
    <>
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
    </>
  );
};
