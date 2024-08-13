import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ProductForm from "@/components/forms/product-form";
import PageContainer from "@/components/layout/page-container";
import { Breadcrumbs } from "@/components/breadcrumbs";

const breadcrumbItems = [
  { title: "Principal", link: "/admin" },
  { title: "Productos", link: "/admin/products" },
  { title: "Nuevo Producto", link: "/admin/products/new" },
];

export default async function Page() {
  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbItems} />
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Producto</CardTitle>
          <CardDescription>Actualizar detalles</CardDescription>
        </CardHeader>

        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
