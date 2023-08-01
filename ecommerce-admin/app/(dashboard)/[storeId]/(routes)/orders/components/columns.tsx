"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
  variants: string;
  quantity: string;
};

//TODO - for isSent:
// header: ({ column }) => {
//   return (
//     <Button
//       variant="ghost"
//       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//     >
//       Products
//       <ArrowUpDown className="w-4 h-4 ml-2" />
//     </Button>
//   );
// },

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const cellValue = JSON.parse(row.getValue("products")) as string[];
      return (
        <>
          {cellValue.map((product, index) => (
            <div key={index}>
              {index + 1}. {product}
            </div>
          ))}
        </>
      );
    },
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const cellValue = JSON.parse(row.getValue("variants")) as string[];
      return (
        <>
          {cellValue.map((variant, index) => (
            <div key={index}>{variant}</div>
          ))}
        </>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const cellValue = JSON.parse(row.getValue("quantity")) as string[];
      return (
        <>
          {cellValue.map((quantity, index) => (
            <div key={index}>{quantity}</div>
          ))}
        </>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
