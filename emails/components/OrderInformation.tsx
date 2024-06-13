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
          <Text>{order.createdAt.toISOString()}</Text>
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
