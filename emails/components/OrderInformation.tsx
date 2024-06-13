import { formatCurrency } from "@/lib/formatter";
import { Order } from "@prisma/client";
import {
  Section,
  Row,
  Column,
  Text,
} from "@react-email/components";

interface OrderInformationProps {
  order: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
  };
  product: {};
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
    <Section>
      <Row>
        <Column>
          <Text>Order Id</Text>
          <Text>{order.id}</Text>
        </Column>
        <Column>
          <Text>Purchased On</Text>
          <Text>{formatDate(order.createdAt)}</Text>
        </Column>
        <Column>
          <Text>Price Paid</Text>
          <Text>
            {formatCurrency(order.pricePaidInCents / 100)}
          </Text>
        </Column>
      </Row>
    </Section>
  );
};
