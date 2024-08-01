import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import ProductForm from "../../../../../components/forms/product-form";

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nuevo Producto</CardTitle>
        <CardDescription>Actualizar detalles</CardDescription>
      </CardHeader>

      <CardContent>
        <ProductForm />
      </CardContent>
    </Card>
  );
}
