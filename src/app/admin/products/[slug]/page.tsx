import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getProductBySlug } from "@/server/queries";
import ProductForm from "@/components/forms/product-form";
import PageContainer from "@/components/layout/page-container";
import { Breadcrumbs } from "@/components/breadcrumbs";



export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  const breadcrumbItems = [
    { title: "Principal", link: "/admin" },
    { title: "Productos", link: "/admin/products" },
    { title: product?.name!, link: `/admin/products/${product?.slug}` },
  ];

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbItems} />
      <Card>
        <CardHeader>
          <CardTitle>Editar Producto</CardTitle>
          <CardDescription>Actualizar detalles</CardDescription>
        </CardHeader>

        <CardContent>
          <ProductForm product={product!} />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
