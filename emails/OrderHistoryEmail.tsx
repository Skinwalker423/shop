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

interface OrderHistoryEmailProps {
  orders: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
    product: {
      name: string;
      imagePath: string;
      description: string;
      id: string;
    };
    downloadVerificationId: string;
  }[];
}

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: "123",
      createdAt: new Date(),
      pricePaidInCents: 1000,
      product: {
        name: "John Wick",
        imagePath:
          "/products/2593f051-3e82-4fc9-81cd-55a9400ce840-666.PNG",
        description: "Image of John Wick",
        id: "72a36261-09e2-47d0-a475-9118e974d2f6",
      },
      downloadVerificationId: crypto.randomUUID(),
    },
    {
      id: "124",
      createdAt: new Date(),
      pricePaidInCents: 20000,
      product: {
        name: "Jason Bourne",
        imagePath:
          "/products/2593f051-3e82-4fc9-81cd-55a9400ce840-666.PNG",
        description: "Image of Jason Bourne",
        id: "72a36261-09e2-47d0-a475-9118e974d2f6",
      },
      downloadVerificationId: crypto.randomUUID(),
    },
    {
      id: "125",
      createdAt: new Date(),
      pricePaidInCents: 42300,
      product: {
        name: "Skinwalker",
        imagePath:
          "/products/2593f051-3e82-4fc9-81cd-55a9400ce840-666.PNG",
        description: "Image of Skinwalker",
        id: "72a36261-09e2-47d0-a475-9118e974d2f6",
      },
      downloadVerificationId: crypto.randomUUID(),
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({
  orders,
}: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History and Downloads</Preview>
      <Tailwind>
        <Head />
        <Body>
          <Container className='max-w-xl border border-red-500'>
            <Heading>Order History</Heading>
            {orders.map((order) => {
              return (
                <OrderInformation
                  downloadVerficationId={
                    order.downloadVerificationId
                  }
                  order={order}
                  product={order.product}
                />
              );
            })}
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
