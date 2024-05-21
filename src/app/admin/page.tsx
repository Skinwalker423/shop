import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatCurrency,
  formatNumber,
} from "@/lib/formatter";
import { getUserData } from "@/actions/users";
import { getSalesData } from "@/actions/orders";
import { getProductsdata } from "@/actions/products";

const AdminPage = async () => {
  const [saleData, usersData, productsData] =
    await Promise.all([
      getSalesData(),
      getUserData(),
      getProductsdata(),
    ]);

  const fomattedAmount = formatCurrency(saleData.amount);
  const formattedNumber = formatNumber(saleData.count);
  const formattedUserCount = formatNumber(
    usersData.totalUsers
  );
  const orders =
    usersData.totalUsers === 1 ? " Order" : " Orders";

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashBoardCard
        title='Sales'
        description={formattedNumber + orders}
        body={fomattedAmount}
      />
      <DashBoardCard
        title='Customers'
        body={formattedUserCount}
        description={
          formatCurrency(usersData.averageValuePerUser) +
          " Average Sales per customer"
        }
      />
      <DashBoardCard
        title='Active Products'
        description={
          productsData.inactiveProducts + " Inactive"
        }
        body={productsData.activeProducts + " Active"}
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
