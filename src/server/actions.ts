"use server";

import { eq } from "drizzle-orm";
import { db } from "./db";
import { Images, Products, type InsertProduct } from "./db/schema";
import { getProduct } from "./queries";
import { utapi } from "~/server/uploadthing";


export async function updateProduct(data: InsertProduct, productId: number) {
  await db.update(Products).set(data).where(eq(Products.id, productId));
  //revalidatePath(`/admin/products/${data.id}`);
  return productId
}

export async function createProduct(data: InsertProduct) {
  const product = await db
    .insert(Products)
    .values(data)
    .returning();

  console.log(`/admin/products/${product[0]!.id}`);
  //redirect(`/admin/products/${product[0]!.id}`);
  return product[0]!.id
}

export async function deleteProduct(productId: number) {
  const product = await getProduct(productId);
  // console.log(product!.images)

  await utapi.deleteFiles(product!.images.map((image) => image.url.replace('https://utfs.io/f/', '')));
  // const deletedImages = await db.delete(Images).where(eq(Images.productId, productId));

  const deletedProduct = await db.delete(Products).where(eq(Products.id, productId));
  console.log({ deletedProduct })
}

export async function setFeaturedImage(imageId: number, productId: number) {
  console.log({ imageId, productId })
  await db.transaction(async (tx) => {
    await tx.update(Images).set({ isFeatured: false }).where(eq(Images.productId, productId));
    await tx.update(Images).set({ isFeatured: true }).where(eq(Images.id, imageId));
  })
}