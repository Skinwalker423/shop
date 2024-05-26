"use client";

import { toggleProductAvailability } from "@/actions/products";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React, { useTransition } from "react";

interface ActiveToggleDropdownItemProps {
  id: string;
  isAvailableForPurchase: boolean;
}

export const ActiveToggleDropdownItem = ({
  id,
  isAvailableForPurchase,
}: ActiveToggleDropdownItemProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(
            id,
            !isAvailableForPurchase
          );
        });
      }}
    >
      {isAvailableForPurchase
        ? "Deactivate Product"
        : "Activate Product"}
    </DropdownMenuItem>
  );
};
