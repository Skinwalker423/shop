import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

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
    // create order
  }
}
