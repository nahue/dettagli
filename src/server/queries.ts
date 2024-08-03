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

export async function getProductsWithFeaturedImage() {
  return await db.query.Products.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    with: {
      images: {
        where: (model, { eq }) => eq(model.isFeatured, true),
      }
    }
  });
}

export async function getProduct(id: number) {
  return await db.query.Products.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    with: {
      images: true
    }
  });
}

export async function createVariant(data: InsertVariant | InsertVariant[]) {
  return await db.insert(Variants).values(data).returning();
}
