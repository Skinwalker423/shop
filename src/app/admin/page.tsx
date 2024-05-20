import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminPage = async () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashBoardCard
        title='User'
        description='test'
        body={"test"}
      />
    </div>
  );
};

interface DashboardProps {
  title: string;
  description: string;
  body: string;
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
