/* eslint-disable @typescript-eslint/no-floating-promises */
import "dotenv/config";
import { createVariant } from "../src/server/queries";
import { Images, Products, ProductVariantTable } from "../src/server/db/schema";
import { db } from "../src/server/db";
import { random, sampleSize } from "lodash-es";
async function main() {
  const variants = await createVariant([
    {
      name: "XS",
    },
    {
      name: "S",
    },
    {
      name: "M",
    },
    {
      name: "L",
    },
    {
      name: "XL",
    },
  ]);

  const products = [{
    name: "Remera WAFFLE",
    slug: "remera-waffle",
    value: 16_000,
    images: [{
      name: "Remera WAFFLE",
      url: "https://utfs.io/f/245d1b34-f716-4e24-a4fd-7cd954e9ed0b-e3yshj.png",
      isFeatured: true
    },
    {
      name: "Remera WAFFLE",
      url: "https://utfs.io/f/a14376f4-be36-4d27-80ee-4b6e2498f03e-j8mk1u.png",
      isFeatured: false
    }]
  }
  ]


  await products.forEach(async (product) => {
    const p = await db
      .insert(Products)
      .values({
        name: product.name,
        slug: product.slug,
        value: product.value ?? random(5000, 10_000)
      })
      .returning();

    console.log(p[0]!.id)

    product.images.forEach(async (image) => {
      await db.insert(Images).values({
        productId: p[0]!.id,
        name: image.name,
        url: image.url,
        isFeatured: image.isFeatured
      })
    })


    // Insert product variants
    // const variantsSample = sampleSize(variants, 2);
    // console.log({ variantsSample })
    // await tx.insert(ProductVariantTable).values(
    //   variantsSample.map((variant) => ({
    //     productId: p[0]!.id,
    //     variantId: variant.id,
    //   })),
    // );

  }
  )
}

await main();
