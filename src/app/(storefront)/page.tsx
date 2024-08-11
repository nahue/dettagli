import { getProductsWithFeaturedImage } from "@/server/queries";
import { ThreeItemGrid } from "./_components/three-items-grid";
import { Carousel } from "./_components/carousel";

export default async function HomePage() {
  const products = await getProductsWithFeaturedImage();


  const restProducts = products.slice(3);
  return (
    <main>
      <ThreeItemGrid products={products} />
      <Carousel products={restProducts} />
    </main>
  );
}
