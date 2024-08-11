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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type SelectProduct } from "@/server/db/schema";
import { updateProduct, createProduct } from "@/server/actions";
import { useRouter } from "next/navigation";
import { FileUploader } from "../file-uploader";
import { useUploadFile } from "@/hooks/use-upload-file";
import { UploadedFilesCard } from "../uploaded-files-card";
import slugify from "slugify";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { omit } from "lodash-es";
import { PRODUCT_SAVED, UPLOADING_PICTURES } from "@/lib/constants";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  slug: z.string(),
  imagesToUpload: z.array(z.instanceof(File)).default([]),
  value: z.coerce.number().int().gt(0),
});

type Props = {
  product?: SelectProduct;
};

const ProductForm = ({ product }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    // @ts-ignore
    defaultValues: product ?? {
      name: "",
      imagesToUpload: [],
      value: 0,
      slug: ""
    },
  });

  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    "imageUploader",
    // @ts-ignore
    { defaultUploadedFiles: product?.images || [] }
  )

  function persistProduct(data: z.infer<typeof formSchema>, productId: number | undefined) {
    const dbData = omit(data, ["imagesToUpload"])

    if (productId) {
      return updateProduct(dbData, productId)
    }

    return createProduct({
      ...dbData,
      slug: slugify(data.name)
    })
  }

  async function onSubmit(input: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true)
    toast.promise(persistProduct(input, product?.id), {
      loading: "Creating product...",
      success: async (productId: number) => {
        if (input.imagesToUpload.length == 0) {
          setLoading(false)
          return `${PRODUCT_SAVED} ...`
        }

        toast.promise(onUpload(input.imagesToUpload, { productId }), {
          loading: `${UPLOADING_PICTURES} ...`,
          success: () => {
            form.reset()
            setLoading(false)
            router.push(`/admin/products/${productId}`);
            return "Images uploaded"
          },
          error: (err) => {
            setLoading(false)
            return getErrorMessage(err)
          },
        })

        return `${PRODUCT_SAVED} ...`
      },
      error: (err) => {
        setLoading(false)
        return getErrorMessage(err)
      },
    })

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
                  <Label htmlFor="name">Nombre</Label>
                </FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Label htmlFor="name">Identificador</Label>
                </FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  Este identificador se usa en la URL para compartir el link y que se vea el nombre del producto.
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
                    <Label>Precio</Label>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Sin puntos ni espacios.
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
          <Label htmlFor="image">Fotos</Label>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="imagesToUpload"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    {/* <FormLabel>Images</FormLabel> */}
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFileCount={1}
                        maxSize={4 * 1024 * 1024}
                        progresses={progresses}
                        // pass the onUpload function here for direct upload
                        // onUpload={uploadFiles}
                        disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  {uploadedFiles.length > 0 ? (
                    <UploadedFilesCard uploadedFiles={uploadedFiles} />
                  ) : null}
                </div>
              )}
            />
          </div>
        </div>
        <Button type="submit" disabled={loading}>Submit</Button>
      </form>
    </Form>
  );
};

export default ProductForm;
