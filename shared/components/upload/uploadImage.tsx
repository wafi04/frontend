"use client";

import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DialogUpdateImage({
  image,
  height,
  width,
  className,
}: {
  image: string;
  height?: number;
  width?: number;
  className?: string;
}) {
  function handleUpdate() {
    // TODO: taruh logika update image di sini
    console.log("Update image clicked!");
  }

  return (
    <Dialog>
      {/* Trigger berupa gambar */}
      <DialogTrigger asChild>
        <Image
          src={image}
          alt="Product"
          width={width ?? 120}
          height={height ?? 120}
          className={cn("cursor-pointer rounded-md border", className)}
        />
      </DialogTrigger>

      {/* Isi dialog */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Image</DialogTitle>
          <DialogDescription>
            Pilih gambar baru untuk mengganti image produk ini.
          </DialogDescription>
        </DialogHeader>

        {/* Preview image */}
        <div className="flex justify-center py-4">
          <Image
            src={image}
            alt="Preview"
            width={200}
            height={200}
            className="rounded-md border"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
