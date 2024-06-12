import React from "react";
import { PageHeader } from "../_components/PageHeader";
import { UsersTable } from "./_components/UsersTable";

const UsersPage = () => {
  return (
    <>
      <PageHeader>Users Page</PageHeader>
      <UsersTable />
    </>
  );
};

export default UsersPage;
