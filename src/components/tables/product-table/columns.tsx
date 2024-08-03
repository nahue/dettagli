"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { SelectProduct } from "~/server/db/schema";

export const columns: ColumnDef<SelectProduct>[] = [
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
    cell: ({ row }) => {
      const featuredImage = row.original.images[0]?.url
      return (
        <div className="flex items-center gap-4">
          {featuredImage ? <div className="relative w-48 aspect-[4/3]"><Image
            src={featuredImage}
            fill
            loading="lazy"
            alt={row.getValue("name")}
            className="rounded-md object-cover"
          /> </div> : <div className="w-[80px] h-[80px]">
          </div>}
          {row.getValue("name")}
        </div>
      )
    },
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
