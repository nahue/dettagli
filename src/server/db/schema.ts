// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  pgTableCreator,
  primaryKey,
  real,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `dettagli_${name}`);

export const Variants = createTable("variant", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
});

export const variantProducts = relations(Variants, ({ many }) => ({
  products: many(Products),
}));

export const Products = createTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 256 }).notNull(),
    value: real("value").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      slugIndex: uniqueIndex("slugIndex").on(table.slug),
    };
  },
);

export const productVariants = relations(Products, ({ many }) => ({
  variants: many(Variants),
}));

export const ProductVariantTable = createTable(
  "product_variant",
  {
    productId: serial("product_id")
      .references(() => Products.id)
      .notNull(),
    variantId: serial("variant_id")
      .references(() => Variants.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.productId, table.variantId] }),
    };
  },
);

export const productToVariantsRelations = relations(
  ProductVariantTable,
  ({ one }) => ({
    product: one(Products, {
      fields: [ProductVariantTable.productId],
      references: [Products.id],
    }),
    variant: one(Variants, {
      fields: [ProductVariantTable.variantId],
      references: [Variants.id],
    }),
  }),
);

export const Images = createTable("images", {
  name: varchar("name", { length: 256 }).notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  productId: serial("product_id").references(() => Products.id).notNull(),
})

export type InsertVariant = typeof Variants.$inferInsert;
export type InsertProduct = typeof Products.$inferInsert;

export type SelectProduct = typeof Products.$inferSelect;
