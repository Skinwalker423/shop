import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic";

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav>
        <NavLink href={"/"}>Home</NavLink>
        <NavLink href={"/products"}>Products</NavLink>
        <NavLink href={"/orders"}>My Orders</NavLink>
        <NavLink href={"/admin/sales"}>Sales</NavLink>
      </Nav>
      <div className='container my-6'>{children}</div>
    </>
  );
};

export default ClientLayout;
