"use server";

import { eq } from "drizzle-orm";
import { db } from "./db";
import { Products, type InsertProduct } from "./db/schema";
import { revalidatePath } from "next/cache";

export async function updateProduct(data: InsertProduct, productId: number) {
  await db.update(Products).set(data).where(eq(Products.id, productId));
  revalidatePath(`/admin/products/${data.id}`);
}
