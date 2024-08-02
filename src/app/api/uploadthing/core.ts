import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { db } from "~/server/db";
import { Images } from "~/server/db/schema";
// import { images } from "~/server/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({
      productId: z.number()
    }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, input: { productId } }) => {
      // This code runs on your server before upload
      // TODO: reactivar
      //const user = auth();
      // If you throw, the user will not be able to upload
      //if (!user.userId) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      //return { userId: user.userId };
      return {
        productId
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      await db.insert(Images).values({
        name: file.name,
        url: file.url,
        productId: metadata.productId,
      })

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "" }// metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
