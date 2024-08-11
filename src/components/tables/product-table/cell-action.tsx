"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProduct } from "@/server/actions";
import { SelectProduct } from "@/server/db/schema";

interface CellActionProps {
  data: SelectProduct;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    deleteProduct(data.id)
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <div className='flex items-center justify-end gap-2'>
        <Button variant="outline" size="icon" title="Ver" onClick={() => router.push(`/productos/${data.slug}`)}>
          <Eye className="h-4 w-4" />
          <span className="sr-only">Ver</span>
        </Button>

        <Button variant='outline' size='icon' title="Editar" onClick={() => router.push(`/admin/products/${data.slug}`)}>
          <Edit className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>

        <Button variant='outline' size='icon' title="Eliminar" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
          <span className="sr-only">Eliminar</span>
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/admin/products/${data.slug}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </>
  );
};
