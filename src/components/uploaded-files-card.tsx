import Image from "next/image"
import type { UploadedFile } from "~/types"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area"
import { EmptyCard } from "~/components/empty-card"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { setFeaturedImage } from "~/server/actions"
import { toast } from "sonner"
import { getErrorMessage } from "~/lib/handle-error"

interface UploadedFilesCardProps {
    uploadedFiles: UploadedFile[]
}

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
    async function handleClick(file: UploadedFile) {
        toast.promise(setFeaturedImage(file.id, file.productId), {
            loading: "Cargando...",
            success: "Imagen principal establecida",
            error: (err) => getErrorMessage(err)
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Fotos ya cargadas</CardTitle>
                <CardDescription>Seleccionar una foto como principal</CardDescription>
            </CardHeader>
            <CardContent>
                {uploadedFiles.length > 0 ? (
                    <ScrollArea className="pb-4">
                        <ToggleGroup type="single" variant="outline" className="flex w-max space-x-2.5">
                            {uploadedFiles.map((file) => (
                                <ToggleGroupItem key={file.url} value={file.url} className="relative w-64 h-full aspect-[4/3]" onClick={() => { handleClick(file) }}>

                                    <Image
                                        src={file.url}
                                        alt={file.name}
                                        fill
                                        sizes="(min-width: 640px) 640px, 100vw"
                                        loading="lazy"
                                        className="rounded-md object-cover p-5"
                                    />
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                ) : (
                    <EmptyCard
                        title="No files uploaded"
                        description="Upload some files to see them here"
                        className="w-full"
                    />
                )}
            </CardContent>
        </Card>
    )
}