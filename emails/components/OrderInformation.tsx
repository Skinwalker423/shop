import { formatCurrency } from "@/lib/formatter";
import { Order } from "@prisma/client";
import {
  Section,
  Row,
  Column,
  Text,
  Img,
  Button,
  Link,
} from "@react-email/components";

interface OrderInformationProps {
  order: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
  };
  product: {
    imagePath: string;
    name: string;
    description: string;
    id: string;
  };
  downloadVerficationId: string;
}

function formatDate(date: Date) {
  const formattedDate = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
  }).format(date);

  return formattedDate;
}

export const OrderInformation = ({
  downloadVerficationId,
  order,
  product,
}: OrderInformationProps) => {
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className='text-gray-500 whitespace-nowrap text-nowrap mb-0'>
              Order Id
            </Text>
            <Text className='mt-0 mr-4'>{order.id}</Text>
          </Column>
          <Column>
            <Text className='text-gray-500 whitespace-nowrap text-nowrap mb-0'>
              Purchased On
            </Text>
            <Text className='mt-0 mr-4'>
              {formatDate(order.createdAt)}
            </Text>
          </Column>
          <Column>
            <Text className='text-gray-500 whitespace-nowrap text-nowrap mb-0'>
              Price Paid
            </Text>
            <Text className='mt-0 mr-4'>
              {formatCurrency(order.pricePaidInCents / 100)}
            </Text>
          </Column>
        </Row>
      </Section>
      <Section className='border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4'>
        <Img
          width={"100%"}
          className='aspect-video'
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}
          alt={product.description}
        />
        <Row className='mt-8'>
          <Column className='align-bottom'>
            <Text className='text-lg m-0 font-bold mr-4'>
              {product.name}
            </Text>
          </Column>
          <Column align='right'>
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${product.id}/download/${downloadVerficationId}`}
              className='bg-black text-white px-6 py-4 rounded text-lg'
            >
              Download
            </Button>
          </Column>
        </Row>
      </Section>
    </>
  );
};
