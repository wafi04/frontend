"use client"
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useAddImage } from "@/lib/api/variants/variantsimage";
import { FormDropdown } from "../ButtonDialogVariants";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";


interface ImageFormProps {
  setOpen: (open: boolean) => void; // Change this line
  open: boolean;
  variantID: string;
}

export function ImageForm({variantID,open,setOpen}  : ImageFormProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const uploads =  useAddImage()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setPreviews((prev) => [...prev, ...newPreviews]);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (indexToRemove: number) => {
    const newPreviews = previews.filter((_, index) => index !== indexToRemove);
    const newFiles = files.filter((_, index) => index !== indexToRemove);

    URL.revokeObjectURL(previews[indexToRemove]);

    setPreviews(newPreviews);
    setFiles(newFiles);
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast.error("file not found")
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("variant_id",variantID)

    try {
      uploads.mutate(formData)
      setPreviews([]);
      setFiles([]);
    } catch (error) {
      console.error(error);
     
    }
  };

  return (
    <Dialog open={open}  onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Image Form
          </DialogTitle>
          <DialogDescription>
            Image Form
          </DialogDescription>
        </DialogHeader>
    <div>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border rounded p-2 mb-4"
        />

      {previews.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-24 object-cover rounded"
                />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={uploads.isPending}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
        Upload Images
      </button>
    </div>
          </DialogContent>
        </Dialog>
  );
}
