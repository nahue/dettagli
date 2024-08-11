import { Gallery } from "@/components/product/gallery";
import { ProductDescription } from "@/components/product/product-description";
import { db } from "@/server/db";
import { SelectImage } from "@/server/db/schema";
import { getProductBySlug } from "@/server/queries";

export async function generateStaticParams() {
    const products = await db.query.Products.findMany({
        columns: {
            slug: true,
        },
    });
    return products.map((product) => ({ params: { slug: product.slug } }));
}


export default async function Page({ params }: { params: { slug: string } }) {
    const product = await getProductBySlug(params.slug);

    if (!product) return null

    return (
        <div className="mx-auto w-9/12 px-4">
            <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
                <div className="h-full w-full basis-full lg:basis-4/6">
                    <Gallery
                        images={product.images.slice(0, 5).map((image: SelectImage) => ({
                            src: image.url,
                            altText: image.name
                        }))}
                    />
                </div>

                <div className="basis-full lg:basis-2/6">
                    <ProductDescription product={product} />
                </div>
            </div>
        </div>
    );
}