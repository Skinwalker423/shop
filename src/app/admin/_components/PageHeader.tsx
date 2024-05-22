import React, { PropsWithChildren } from "react";

interface PageHeaderProps extends PropsWithChildren {}

export const PageHeader = ({
  children,
}: PageHeaderProps) => {
  return <h1 className='text-4xl mb-4'>{children}</h1>;
};
