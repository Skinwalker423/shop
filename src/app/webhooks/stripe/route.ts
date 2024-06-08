import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductById } from "@/actions/products";
import { createOrderAndUpsertUser } from "@/actions/orders";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string
);

export async function POST(request: NextRequest) {
  const signature = request.headers.get(
    "stripe-signature"
  ) as string;
  const bodyText = await request.text();
  const event = stripe.webhooks.constructEvent(
    bodyText,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    console.log("charge successfully completed");
    const chargeSucceeded = event.data.object;
    const productId = chargeSucceeded.metadata.productId;
    const email = chargeSucceeded.billing_details.email;
    const pricePaidInCents = chargeSucceeded.amount;

    // create order

    const product = await getProductById(productId);

    if (product == null || email == null) {
      return new NextResponse("Bad Request", {
        status: 400,
      });
    }

    const userOrder = await createOrderAndUpsertUser({
      email,
      pricePaidInCents,
      productId,
    });

    console.log("order", userOrder);
  }
}
