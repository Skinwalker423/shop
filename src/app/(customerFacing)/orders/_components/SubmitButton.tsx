"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full' size={"lg"}>
      {pending ? "Submitting" : "Send"}
    </Button>
  );
};
