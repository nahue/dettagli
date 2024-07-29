import { Breadcrumbs } from "~/components/breadcrumbs";
import PageContainer from "~/components/layout/page-container";
import { ProductClient } from "~/components/tables/product-table/client";
import { getProducts } from "~/server/queries";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin" },
  { title: "Productos", link: "/dashboard/products" },
];

export default async function page() {
  const dbProducts = await getProducts();
  console.log(dbProducts);
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductClient data={dbProducts} />
      </div>
    </PageContainer>
  );
}
