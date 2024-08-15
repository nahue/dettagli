import { getProductsWithFeaturedImage } from "@/server/queries";
import { ThreeItemGrid } from "./_components/three-items-grid";
import { Carousel } from "./_components/carousel";
import perchas from '@/perchas.jpg'
import Image from "next/image";
import Hero from "./_components/hero";

export default async function HomePage() {
  const products = await getProductsWithFeaturedImage();


  const restProducts = products.slice(3);
  return (
    <main>

      <section className="bg-muted/20 py-12 md:py-20">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Hero />
          </div>
          <Image
            src={perchas}
            alt="Hero Image"
            width={800}
            height={600}
            className="rounded-lg object-bottom object-cover"
            style={{ aspectRatio: "800/600", objectFit: "cover" }}
            priority={true}
          />
        </div>
      </section>
      <ThreeItemGrid products={products} />
      <Carousel products={restProducts} />
    </main>
  );
}
