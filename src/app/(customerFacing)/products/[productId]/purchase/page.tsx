import React from "react";

const PurchasePage = ({
  params,
}: {
  params: { productId: string };
}) => {
  console.log("params", params);
  return <div>PurchasePage</div>;
};

export default PurchasePage;
