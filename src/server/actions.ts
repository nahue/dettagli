"use server";

import { eq } from "drizzle-orm";
import { db } from "./db";
import { Products, type InsertProduct } from "./db/schema";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { redirect } from "next/navigation";

export async function updateProduct(data: InsertProduct, productId: number) {
  await db.update(Products).set(data).where(eq(Products.id, productId));
  revalidatePath(`/admin/products/${data.id}`);
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
