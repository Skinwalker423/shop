"use client";

import { deleteUser } from "@/actions/users";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface DeleteDropdownUserItemProps {
  userId: string;
}

export const DeleteDropdownUserItem = ({
  userId,
}: DeleteDropdownUserItemProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      variant='destructive'
      disabled={isPending}
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
