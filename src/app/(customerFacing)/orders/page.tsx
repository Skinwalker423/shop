"use client";

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
import { emailOrderHistory } from "@/actions/orders";
import { useFormState } from "react-dom";

const OrdersPage = () => {
  const [state, formAction] = useFormState(
    emailOrderHistory,
    {}
  );
  return (
    <form action={formAction}>
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
          {state.error && (
            <div className='px-4 py-2 text-destructive'>
              {state.error}
            </div>
          )}
        </CardContent>
        <CardFooter>
          {state.message ? (
            <p>{state.message}</p>
          ) : (
            <SubmitButton />
          )}
        </CardFooter>
      </Card>
    </form>
  );
};

export default OrdersPage;
