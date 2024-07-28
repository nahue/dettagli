import { Breadcrumbs } from "~/components/breadcrumbs";
import PageContainer from "~/components/layout/page-container";
import { ProductClient } from "~/components/tables/product-table/client";
// import { UserClient } from "@/components/tables/user-tables/client";
import { products } from "~/constants/data";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin" },
  { title: "Productos", link: "/dashboard/products" },
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductClient data={products} />
        {/* <UserClient data={users} /> */}
      </div>
    </PageContainer>
  );
}
