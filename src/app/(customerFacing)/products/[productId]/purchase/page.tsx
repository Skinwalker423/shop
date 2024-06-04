import { getProductById } from "@/actions/products";
import { notFound } from "next/navigation";
import React from "react";

import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string
);

const PurchasePage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  console.log("params", params);
  const product = await getProductById(params.productId);

  if (product == null) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "USD",
    amount: product.priceInCents,
    metadata: {
      productId: product.id,
    },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
};

export default PurchasePage;
