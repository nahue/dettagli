import Link from 'next/link';
import { GridTileImage } from '~/components/grid-tile-image';
import { type SelectProduct } from '~/server/db/schema';

function ThreeItemGridItem({
    item,
    size,
    priority
}: {
    item: SelectProduct;
    size: 'full' | 'half';
    priority?: boolean;
}) {
    return (
        <div
            className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
        >
            <Link
                className="relative block aspect-square h-full w-full"
                href={`/productos/${item.slug}`}
                prefetch={true}
            >
                <GridTileImage
                    src={item.images[0]!.url}
                    fill
                    sizes={
                        size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
                    }
                    priority={priority}
                    alt={item.name}
                    label={{
                        position: size === 'full' ? 'center' : 'bottom',
                        title: item.name,
                        amount: item.value, // item.priceRange.maxVariantPrice.amount,
                        currencyCode: "ARS" //item.priceRange.maxVariantPrice.currencyCode
                    }}
                />
            </Link>
        </div>
    );
}

export async function ThreeItemGrid(products: SelectProduct[]) {
    const [firstProduct, secondProduct, thirdProduct] = products["products"];

    return (
        <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
            <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
            <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
            <ThreeItemGridItem size="half" item={thirdProduct} />
        </section>
    );
}