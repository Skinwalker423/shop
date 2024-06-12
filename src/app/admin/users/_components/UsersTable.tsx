import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatCurrency } from "@/lib/formatter";
import {
  CheckCircle2,
  EllipsisVertical,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { getUsers } from "@/actions/users";
import { DeleteDropdownUserItem } from "./UsrActionItem";

export const UsersTable = async () => {
  const users = await getUsers();

  console.log("users", users);

  if (users && users?.length === 0)
    return <p>No Customers Found</p>;

  return (
    <Table>
      <TableCaption>
        A list of your recent invoices.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=''>Email</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className='w-0'>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.length > 0 &&
          users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell className='font-medium'>
                  {user.email}
                </TableCell>
                <TableCell>
                  {user.orders.length || 0}
                </TableCell>
                <TableCell>
                  {formatCurrency(
                    user.orders.reduce((acc, a) => {
                      return a.pricePaidInCents + acc;
                    }, 0) / 100 || 0
                  )}
                </TableCell>

                <TableCell className='font-medium'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                      <span className='sr-only'>
                        More Options
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DeleteDropdownUserItem
                        userId={user.id}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
