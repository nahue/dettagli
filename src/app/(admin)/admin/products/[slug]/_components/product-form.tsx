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
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { type SelectProduct } from "~/server/db/schema";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type Props = {
  product: SelectProduct;
};

const ProductForm = ({ product }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form className="grid gap-6">
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
        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
            className="min-h-32"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-3">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" defaultValue="99.99" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="inventory">Inventory Quantity</Label>
            <Input id="inventory" type="number" defaultValue="100" />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="image">Product Image</Label>
          <div className="grid gap-2">
            <img
              src="/placeholder.svg"
              alt="Product image"
              width={300}
              height={300}
              className="aspect-square w-full rounded-md object-cover"
            />
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm">
                <div className="h-4 w-4" />
                <span>Upload</span>
              </Button>
              <Button variant="outline" size="sm">
                <div className="h-4 w-4" />
                <span>Delete</span>
              </Button>
              <Button variant="outline" size="sm">
                <div className="h-4 w-4" />
                <span>Zoom</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
