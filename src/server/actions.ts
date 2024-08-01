"use server";

import { eq } from "drizzle-orm";
import { db } from "./db";
import { Products, type InsertProduct } from "./db/schema";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function updateProduct(data: InsertProduct, productId: number) {
  await db.update(Products).set(data).where(eq(Products.id, productId));
  revalidatePath(`/admin/products/${data.id}`);
}

export async function createProduct(data: InsertProduct) {
  const slug = slugify(data.name);
  const product = await db
    .insert(Products)
    .values({ ...data, slug })
    .returning();

  console.log(`/admin/products/${product[0]!.id}`);
  revalidatePath(`/admin/products/${product[0]!.id}`);
}
