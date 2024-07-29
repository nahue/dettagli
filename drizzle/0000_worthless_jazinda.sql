CREATE TABLE IF NOT EXISTS "dettagli_product_variant" (
	"product_id" serial NOT NULL,
	"variant_id" serial NOT NULL,
	CONSTRAINT "dettagli_product_variant_product_id_variant_id_pk" PRIMARY KEY("product_id","variant_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dettagli_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"featuredImage" varchar(1024) NOT NULL,
	"value" real DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dettagli_variant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	CONSTRAINT "dettagli_variant_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dettagli_product_variant" ADD CONSTRAINT "dettagli_product_variant_product_id_dettagli_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."dettagli_products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dettagli_product_variant" ADD CONSTRAINT "dettagli_product_variant_variant_id_dettagli_variant_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."dettagli_variant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "slugIndex" ON "dettagli_products" USING btree ("slug");