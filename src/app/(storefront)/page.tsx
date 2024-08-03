import Image from "next/image";
import Link from "next/link";
import ProductLabel from "~/components/product-label";
import { getProductsWithFeaturedImage } from "~/server/queries";
import { ThreeItemGrid } from "./_components/three-items-grid";
import { Carousel } from "./_components/carousel";

export const dynamic = "force-dynamic";


export default async function HomePage() {
  const products = await getProductsWithFeaturedImage();


  const restProducts = products.slice(3);
  console.log({ restProducts })
  return (
    <main>
      <ThreeItemGrid products={products} />
      <Carousel products={restProducts} />
    </main>
  );
}
