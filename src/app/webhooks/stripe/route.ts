import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductById } from "@/actions/products";
import { createOrderAndUpsertUser } from "@/actions/orders";
import db from "../../../../db";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string
);

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const downloadVerification =
      await db.downloadVerification.create({
        data: {
          productId,
          expriresAt: new Date(
            Date.now() + 24 * 60 * 60 * 1000
          ),
        },
      });

    const confirmationEmail = await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Order Confirmation",
      text: "it works!",
    });
  }
}
