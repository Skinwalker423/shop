"use client";

import {
  deleteProductById,
  toggleProductAvailability,
} from "@/actions/products";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(
            id,
            !isAvailableForPurchase
          );
          router.refresh();
        });
      }}
    >
      {isAvailableForPurchase
        ? "Deactivate Product"
        : "Activate Product"}
    </DropdownMenuItem>
  );
};

interface DeleteDropdownItemProps {
  id: string;
  disabled: boolean;
}

export const DeleteDropdownItem = ({
  id,
  disabled,
}: DeleteDropdownItemProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      variant='destructive'
      disabled={isPending || disabled}
      onClick={() => {
        startTransition(async () => {
          await deleteProductById(id);
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
};
