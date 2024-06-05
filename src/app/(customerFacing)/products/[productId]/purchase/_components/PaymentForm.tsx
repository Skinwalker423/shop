"use client";
import React, {
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
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

interface FormProps {
  clientSecret: string;
  priceInCents: number;
}

export const PaymentForm = ({
  clientSecret,
  priceInCents,
}: FormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        if (!paymentIntent) {
          setMessage("Something went wrong.");
          return;
        }

        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage(
              "Your payment was not successful, please try again."
            );
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

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
          <CardDescription>
            Card Description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentElement
            id='payment-element'
            options={paymentElementOptions}
          />
        </CardContent>
        <CardFooter>
          <Button
            disabled={isLoading || !stripe || !elements}
            id='submit'
          >
            {" "}
            {!isLoading ? (
              <Loader2 className='animate-spin' />
            ) : (
              `Purchase - ${formatCurrency(
                priceInCents / 100
              )}`
            )}
          </Button>
          {message && (
            <div id='payment-message'>{message}</div>
          )}
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
