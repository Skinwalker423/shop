import {
  Button,
  Html,
  Heading,
} from "@react-email/components";
import * as React from "react";

export default function PurchaseHistory() {
  return (
    <Html>
      <Heading>Purchase History</Heading>
      <Button
        href='https://example.com'
        style={{
          background: "#000",
          color: "#fff",
          padding: "12px 20px",
        }}
      >
        Click me
      </Button>
    </Html>
  );
}
