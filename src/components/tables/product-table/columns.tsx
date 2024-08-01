"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { type Product } from "~/constants/data";
import { Checkbox } from "~/components/ui/checkbox";
import Image from "next/image";

export const columns: ColumnDef<Product>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected()}
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Image
          src={row.original.featuredImage}
          width={80}
          height={80}
          alt={row.getValue("name")}
        />
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: "Precio",
    cell: ({ row }) => {
      const value = parseInt(row.getValue("value"));
      return <>$ {value.toFixed(2)}</>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
