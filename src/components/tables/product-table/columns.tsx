"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { type Product } from "~/constants/data";
import { Checkbox } from "~/components/ui/checkbox";
import Image from "next/image";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "featuredImage",
    header: "FEATURED IMAGE",
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue("featuredImage")}
          width={80}
          height={80}
          alt={row.getValue("name")}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
