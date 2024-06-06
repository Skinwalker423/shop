import Stripe from "stripe";

import { formatCurrency } from "@/lib/formatter";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/actions/products";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string
);
const PurchaseSuccessPage = async ({
  searchParams,
}: {
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
    redirect_status: string;
  };
}) => {
  console.log("params", searchParams);
  const clientSecret =
    searchParams.payment_intent_client_secret;
  const payementIntentID = searchParams.payment_intent;
  const paymentIntent =
    await stripe.paymentIntents.retrieve(payementIntentID);

  const productId = paymentIntent.metadata.productId;

  if (productId == null) return notFound();

  const product = await getProductById(productId);

  if (product == null) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <div className='max-w-5xl mx-auto w-full space-y-8'>
      <Alert
        variant={isSuccess ? "success" : "destructive"}
        className=''
      >
        <Terminal className='h-4 w-4' />
        <AlertTitle>
          {isSuccess ? "Success!" : "Error"}
        </AlertTitle>
        <AlertDescription>
          {isSuccess
            ? "Thank you for your purchase"
            : paymentIntent.status}
        </AlertDescription>
      </Alert>

      <div className='flex gap-4 items-center'>
        <div className='aspect-video w-1/3 flex-shrink-0 relative'>
          <Image
            src={product.imagePath}
            alt={`product image of ${product.name}`}
            fill
            className='object-cover'
          />
        </div>
        <div>
          <div className='text-lg'>
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className='text-2xl font-bold'>
            {product.name}
          </h1>
          <div className='line-clamp-3 text-muted-foreground'>
            {product.description} df wefwe wef wefw efwef
            wefwef wfwfwwef
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
