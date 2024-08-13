import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { ProductClient } from "@/components/tables/product-table/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProductsWithFeaturedImage } from "@/server/queries";

export const dynamic = "force-dynamic"

const breadcrumbItems = [
  { title: "Principal", link: "/admin" },
  { title: "Productos", link: "/dashboard/products" },
];

export default async function page() {
  const dbProducts = await getProductsWithFeaturedImage();

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbItems} />
      <Card>
        <CardHeader>
          <CardTitle>Productos ({dbProducts.length})</CardTitle>
          <CardDescription>Lista de productos</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductClient data={dbProducts} />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
