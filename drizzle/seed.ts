/* eslint-disable @typescript-eslint/no-floating-promises */
import "dotenv/config";
import { createVariant } from "../src/server/queries";
import { Images, Products, ProductVariantTable } from "../src/server/db/schema";
import { db } from "../src/server/db";
import { sampleSize } from "lodash-es";
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

  const images = [
    "https://utfs.io/f/bcc7d907-98fa-42d7-af88-97a8faa1535e-gt99c8.jpeg",
    "https://utfs.io/f/a87214c7-d1ab-4a0d-b3c9-f679d95119d6-m36kwb.jpeg",
    "https://utfs.io/f/2a47910b-fa47-4117-b64b-58a8b82b8e3b-svukre.jpeg",
  ];

  for (const index in images) {
    await db.transaction(async (tx) => {
      const product = await tx
        .insert(Products)
        .values({
          name: `Product ${index}`,
          slug: `product-${index}`
        })
        .returning();

      await tx.insert(Images).values({
        productId: product[0]!.id,
        name: images[index]!,
        url: images[index]!,
      })

      // Insert product variants
      const variantsSample = sampleSize(variants, 2);
      await tx.insert(ProductVariantTable).values(
        variantsSample.map((variant) => ({
          productId: product[0]!.id,
          variantId: variant.id,
        })),
      );
    })

  }
}

await main();
