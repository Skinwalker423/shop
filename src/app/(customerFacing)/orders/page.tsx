import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";
import { SubmitButton } from "./_components/SubmitButton";

const OrdersPage = () => {
  return (
    <form action=''>
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Enter your email and we will email you your
            order history and download links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            required
            name='email'
            id='email'
          />
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
};

export default OrdersPage;
