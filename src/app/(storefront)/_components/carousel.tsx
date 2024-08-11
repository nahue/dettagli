
import Link from 'next/link';
import { GridTileImage } from '@/components/grid-tile-image';
import { SelectProduct } from '@/server/db/schema';

export async function Carousel(items: SelectProduct[]) {
    const products: SelectProduct[] = items["products"]

    if (!products?.length) return null;

    // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
    const carouselProducts = [...products, ...products, ...products];

    return (
        <div className="w-full overflow-x-auto pb-6 pt-1">
            <ul className="flex animate-carousel gap-4">
                {carouselProducts.map((product, i) => (
                    <li
                        key={`${product.slug}${i}`}
                        className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
                    >
                        <Link href={`/productos/${product.slug}`} className="relative h-full w-full">
                            <GridTileImage
                                alt={product.name}
                                label={{
                                    title: product.name,
                                    amount: product.value, // product.priceRange.maxVariantPrice.amount,
                                    currencyCode: "ARS" // product.priceRange.maxVariantPrice.currencyCode
                                }}
                                src={product.images[0]!.url}
                                fill
                                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}