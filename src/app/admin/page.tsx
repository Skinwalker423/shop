import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "../../../db";
import {
  formatCurrency,
  formatNumber,
} from "@/lib/formatter";

const getSalesData = async () => {
  "use server";

  const data = await db.order.aggregate({
    _count: true,
    _sum: { pricePaidInCens: true },
  });

  console.log("res", data);

  return {
    amount: data._sum.pricePaidInCens || 0,
    count: data._count,
  };
};

const AdminPage = async () => {
  const { amount, count } = await getSalesData();

  const averageSalesPerCustomer = formatCurrency(
    amount / count
  );
  const fomattedAmount = formatCurrency(amount);
  const formattedNumber = formatNumber(count);
  const orders = count === 1 ? " Order" : " Orders";

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashBoardCard
        title='Sales'
        description={formattedNumber + orders}
        body={fomattedAmount}
      />
      <DashBoardCard
        title='Customers'
        description='test'
        body={averageSalesPerCustomer + " Average Sales"}
      />
    </div>
  );
};

interface DashboardProps {
  title: string;
  description: string;
  body: string | number;
}

const DashBoardCard = ({
  title,
  description,
  body,
}: DashboardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
