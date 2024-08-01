"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
// import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { InsertProduct, type SelectProduct } from "~/server/db/schema";
import { updateProduct } from "~/server/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createProduct } from "~/server/actions";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  //   slug: z
  //     .string()
  //     .min(2, {
  //       message: "Name must be at least 2 characters.",
  //     })
  //     .nullable(),
  featuredImage: z.string().nullable(),
  value: z.coerce.number().int().gt(0),
});

type Props = {
  product?: SelectProduct;
};

const ProductForm = ({ product }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product ?? {
      name: "",
      featuredImage:
        "https://utfs.io/f/bcc7d907-98fa-42d7-af88-97a8faa1535e-gt99c8.jpeg",
      value: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (product?.id) {
      console.log(values, product.id);
      await updateProduct(values as InsertProduct, product.id);
    } else {
      await createProduct(values as InsertProduct);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
        className="space-y-8"
      >
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Label htmlFor="name">Product Name</Label>
                </FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
            className="min-h-32"
          />
        </div> */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label>Price</Label>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div className="grid gap-3">
            <Label htmlFor="inventory">Inventory Quantity</Label>
            <Input id="inventory" type="number" defaultValue="100" />
          </div> */}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="image">Product Image</Label>
          <div className="grid gap-2">
            {product?.featuredImage && (
              <Image
                src={product.featuredImage}
                alt="Product image"
                width={100}
                height={100}
                className="aspect-square w-72 rounded-md object-cover"
              />
            )}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProductForm;
