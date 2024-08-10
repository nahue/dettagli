"use client";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { type SelectProduct } from "~/server/db/schema";

interface ProductsClientProps {
  data: SelectProduct[];
}

export const ProductClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/admin/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
