import Link from "next/link";
import ProductLabel from "~/components/product-label";
import { getProductsWithFeaturedImage } from "~/server/queries";

export const dynamic = "force-dynamic";


export default async function HomePage() {
  const products = await getProductsWithFeaturedImage();
  const featuredProject = products[0];
  const restOfProducts = products.slice(1, 3);

  return (
    <main>
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
        <div className="md:col-span-4 md:row-span-2">
          <Link
            href={`/productos/${featuredProject?.slug}`}
            className="relative block aspect-square h-full w-full"
          >
            <div className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white hover:border-blue-600 dark:border-neutral-800 dark:bg-black">
              {/* {featuredProject.name} */}
              <img
                className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                src={featuredProject?.images[0]!.url}
              />

              <ProductLabel
                title={featuredProject?.name}
                amount={featuredProject?.value}
                currencyCode={"ARS"}
                position={"center"}
              />
            </div>
          </Link>
        </div>
        {restOfProducts.map((product) => (
          <div key={product.id} className="md:col-span-2 md:row-span-1">
            <Link
              href={""}
              className="relative block aspect-square h-full w-full"
            >
              <div className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white hover:border-blue-600 dark:border-neutral-800 dark:bg-black">
                {/* {featuredProject.name} */}
                <img
                  className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                  src={product.images[0]!.url}
                />

                <ProductLabel
                  title={product.name}
                  amount={product.value}
                  currencyCode={"ARS"}
                />
              </div>
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
