import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { getProduct } from "~/server/queries";
import ProductForm from "./_components/product-form";

export default async function Page({ params }: { params: { id: number } }) {
  const product = await getProduct(params.id);
  console.log({ product });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Producto</CardTitle>
        <CardDescription>Actualizar detalles</CardDescription>
      </CardHeader>

      <CardContent>
        <ProductForm product={product!} />
      </CardContent>
    </Card>
  );
}
