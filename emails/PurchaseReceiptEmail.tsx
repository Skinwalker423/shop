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

interface PurchaseReceiptEmailProps {
  product: {
    name: string;
  };
}

PurchaseReceiptEmail.PreviewProps = {
  product: { name: "John Wick" },
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
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
