// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
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
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  productId: serial("product_id").references(() => Products.id, { onDelete: "cascade" }).notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
})


// region Relations
export const productRelations = relations(Products, ({ many }) => ({
  variants: many(Variants),
  images: many(Images),
}));

export const imageRelations = relations(Images, ({ one }) => ({
  product: one(Products, {
    fields: [Images.productId],
    references: [Products.id],
  }),
}))

export const variantProducts = relations(Variants, ({ many }) => ({
  products: many(Products),
}));
// endregion


// region Types
export type InsertVariant = typeof Variants.$inferInsert;
export type InsertProduct = typeof Products.$inferInsert;
export type SelectImage = typeof Images.$inferSelect;

export type SelectProduct = InferSelectModel<typeof Products> & {
  images: SelectImage[];
};
// endregion
