import { Nav } from "@/components/Nav";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav />
      <div className='container my-6'>{children}</div>
    </>
  );
};

export default AdminLayout;
