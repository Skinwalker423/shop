import {
  Button,
  Html,
  Head,
  Body,
  Heading,
  Tailwind,
  Preview,
  Container,
} from "@react-email/components";
import * as React from "react";
import { OrderInformation } from "./components/OrderInformation";

interface PurchaseReceiptEmailProps {
  product: {
    name: string;
  };
  order: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
  };
  downloadVerificationId: string;
}

PurchaseReceiptEmail.PreviewProps = {
  product: { name: "John Wick" },
  order: {
    id: "123",
    createdAt: new Date(),
    pricePaidInCents: 1000,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>
        Download {product.name} and view receipt
      </Preview>
      <Tailwind>
        <Head />
        <Body>
          <Container className='max-w-xl border border-red-500'>
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              downloadVerficationId={downloadVerificationId}
              order={order}
              product={product}
            />
            <Button
              href='https://example.com'
              className='bg-red-400 text-white py-2 px-4 rounded-xl'
            >
              Click me
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
