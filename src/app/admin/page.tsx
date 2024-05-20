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

  const res = await db.order.count();

  console.log("res", res);

  return res;
};

const AdminPage = async () => {
  const count = await getSalesData();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashBoardCard
        title='Oders'
        description='Number of active orders'
        body={count}
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
