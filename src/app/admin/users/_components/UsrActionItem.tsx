"use client";

import { deleteUser } from "@/actions/users";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface DeleteDropdownUserItemProps {
  userId: string;
  disabled: boolean;
}

export const DeleteDropdownUserItem = ({
  userId,
  disabled,
}: DeleteDropdownUserItemProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      variant='destructive'
      disabled={isPending || disabled}
      onClick={() => {
        startTransition(async () => {
          await deleteUser(userId);
        });
        router.refresh();
      }}
    >
      Delete
    </DropdownMenuItem>
  );
};
