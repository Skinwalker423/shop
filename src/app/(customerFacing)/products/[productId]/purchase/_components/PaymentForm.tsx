"use client";
import React, { FormEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/formatter";
import { userOrderExists } from "@/actions/orders";

interface FormProps {
  priceInCents: number;
  productId: string;
}

export const PaymentForm = ({
  priceInCents,
  productId,
}: FormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !email) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
    setMessage(null);

    // check user order exists
    const orderExists = await userOrderExists(
      email,
      productId
    );

    if (orderExists) {
      setMessage("Order exists. Download it in MyOrders");
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (
      error.type === "card_error" ||
      error.type === "validation_error"
    ) {
      setMessage(
        error.message || "problem confirming payment"
      );
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions =
    {
      layout: "tabs",
    };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          {message && (
            <CardDescription>{message}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement
            id='payment-element'
            options={paymentElementOptions}
          />
          <div className='mt-4'>
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={isLoading || !stripe || !elements}
            id='submit'
            className='w-full'
          >
            {" "}
            {isLoading ? (
              <Loader2 className='animate-spin' />
            ) : (
              `Purchase - ${formatCurrency(
                priceInCents / 100
              )}`
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

{
  /* <button
className='bg-primary text-primary-foreground px-4 py-2 rounded-lg'
disabled={isLoading || !stripe || !elements}
id='submit'
>
<span id='button-text'>
  {isLoading ? (
    <div className='spinner' id='spinner'></div>
  ) : (
    `Purchase - ${formatCurrency(
      priceInCents / 100
    )}`
  )}
</span>
</button> */
}
{
  /* Show any error or success messages */
}
