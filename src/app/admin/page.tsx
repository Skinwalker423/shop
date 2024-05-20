import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "../../../db";

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

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashBoardCard
        title='Total Orders'
        description='Number of active orders'
        body={count}
      />
      <DashBoardCard
        title='Total Sales'
        description='total amount'
        body={`$ ${amount / 100}`}
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
