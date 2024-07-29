"use server";
//import "server-only";

import { db } from "./db";
// import { auth } from "@clerk/nextjs/server";
import {
  type InsertProduct,
  type InsertVariant,
  Products,
  Variants,
} from "./db/schema";

export async function getMyImages() {
  return [];
  //   const user = auth();
  //   if (!user.userId) throw new Error("Not logged in");
  //   return await db.query.images.findMany({
  //     where: (model, { eq }) => eq(model.userId, user.userId),
  //     orderBy: (model, { desc }) => desc(model.id),
  //   });
}

export async function getProducts() {
  return await db.query.Products.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
}

export async function getProduct(slug: string) {
  return await db.query.Products.findFirst({
    where: (model, { eq }) => eq(model.slug, slug),
  });
}

export async function createVariant(data: InsertVariant | InsertVariant[]) {
  return await db.insert(Variants).values(data).returning();
}

export async function createProduct(data: InsertProduct) {
  return (await db.insert(Products).values(data).returning())[0];
}
