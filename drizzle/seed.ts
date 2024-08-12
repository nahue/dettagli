/* eslint-disable @typescript-eslint/no-floating-promises */
import "dotenv/config";
import { createVariant } from "../src/server/queries";
import { Images, Products, ProductVariantTable, users } from "../src/server/db/schema";
import { db } from "../src/server/db";
import { random, sampleSize } from "lodash-es";
import bcrypt from "bcryptjs";
async function main() {

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASS as string, 10);

  const user = await db.insert(users).values({
    name: 'admin',
    password_hash: passwordHash
  }).returning()

  // const variants = await createVariant([
  //   {
  //     name: "XS",
  //   },
  //   {
  //     name: "S",
  //   },
  //   {
  //     name: "M",
  //   },
  //   {
  //     name: "L",
  //   },
  //   {
  //     name: "XL",
  //   },
  // ]);

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
      url: "https://utfs.io/f/a14376f4-be36-4d27-80ee-4b6e2498f03e-j8mk1u.png"
    }]
  }, {
    name: "Pantalón SASTRERO",
    slug: "pantalon-sastrero",
    value: 35_000,
    images: [{
      name: "Pantalón SASTRERO",
      url: "https://utfs.io/f/4763e919-35c3-43f8-9e19-cfb64a0ba3a1-c6suqq.png",
      isFeatured: true
    }, {
      name: "Pantalón SASTRERO",
      url: "https://utfs.io/f/b31c7684-332c-42fb-99f9-4158032d07e7-rvqjax.png",
    }]
  }, {
    name: "Musculsa PRINTU",
    slug: "musculsa-printu",
    value: 12_000,
    images: [{
      name: "Musculsa PRINTU",
      url: "https://utfs.io/f/eda01a17-b885-4bed-b91b-4e6c7b81048d-a90rq.png",
      isFeatured: true
    }, {
      name: "Musculsa PRINTU",
      url: "https://utfs.io/f/f4b37460-40f8-4557-a30e-b626863ea1f9-ux7xsh.png",
    }]
  }, {
    name: "Body BOT",
    slug: "body-bot",
    value: 16_000,
    images: [{
      name: "Body BOT",
      url: "https://utfs.io/f/24d030d8-de08-4076-803e-d92960d3619f-385245.png",
      isFeatured: true
    }, {
      name: "Body BOT",
      url: "https://utfs.io/f/58627657-c9db-43a3-9cca-13c059c6af62-e9joxq.png",
    }]
  }, {
    name: "Remera POOL",
    slug: "remera-pool",
    value: 16_000,
    images: [{
      name: "Remera POOL",
      url: "https://utfs.io/f/edad6970-0595-4254-90f0-da64ea26d5cc-uhcbsr.png",
      isFeatured: true
    }, {
      name: "Remera POOL",
      url: "https://utfs.io/f/90bc344c-aaf7-4279-b850-78f8ef3c198a-s2hqea.png",
    }]
  }, {
    name: "Jean mom TAYLOR",
    slug: "jean-mom-taylor",
    value: 40_000,
    images: [{
      name: "Jean mom TAYLOR",
      url: "https://utfs.io/f/ef9bb777-3798-4a8f-88b1-fef3b2ce34ca-azgm80.jpeg",
      isFeatured: true
    }, {
      name: "Jean mom TAYLOR",
      url: "https://utfs.io/f/b3c1ea52-5e1e-426a-80a8-2c86c0fedd0f-77m0k0.jpg"
    }]
  }, {
    name: "Top YAVIZA",
    slug: "top-yaviza",
    value: 12_000,
    images: [{
      name: "Top YAVIZA Negro",
      url: "https://utfs.io/f/f61e4158-73a0-42b0-971a-3120094e3b66-q2kdr.jfif",
    }, {
      name: "Top YAVIZA Verde",
      url: "https://utfs.io/f/2f018161-d458-4ff4-a0e2-5a1776d345f6-irmeqq.jfif",
      isFeatured: true
    }, {
      name: "Top YAVIZA Verde",
      url: "https://utfs.io/f/75310bf2-e527-41a7-ba15-12492a4eaf01-8gkfwt.jfif"

    }]
  }, {
    name: "Remera SEX",
    slug: "remera-sex",
    value: 15_000,
    images: [{
      name: "Remera SEX",
      url: "https://utfs.io/f/4f77370c-f8a4-41c4-a7f3-d9c0a24815b6-ql92kg.jfif",
      isFeatured: true
    }, {
      name: "Remera SEX",
      url: "https://utfs.io/f/670e86d9-6041-4c1e-a942-10294b2a637a-mt4e60.jfif"
    }]
  }]

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
