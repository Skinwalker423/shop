"use client";

import type { Product } from "@prisma/client";
import React, { FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";

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
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
        },
      }}
      stripe={stripePromise}
    >
      <Form clientSecret={clientSecret} />
    </Elements>
  );
};

interface FormProps {
  clientSecret: string;
}

const Form = ({ clientSecret }: FormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
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

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
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
        return_url: "http://localhost:3000",
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
      <PaymentElement
        id='payment-element'
        options={paymentElementOptions}
      />
      <button
        disabled={isLoading || !stripe || !elements}
        id='submit'
      >
        <span id='button-text'>
          {isLoading ? (
            <div className='spinner' id='spinner'></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
};
