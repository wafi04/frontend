import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { CategoryForm, CategoryUpdate } from "@/types/categories";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/FormInput";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/lib/api/categories/category.";

export type CATEGORY_STEP = "Basic Information" | "Meta Information" | "Image";
export function FormCategory({
  initialData,
  title,
  subTitle,
  open,
  onClose,
  parentId,
}: {
  initialData?: CategoryUpdate;
  title: string;
  parentId?: string;
  open: boolean;
  onClose: () => void;
  subTitle: string;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    (initialData?.image as string) || null
  );
  const create = useCreateCategory();
  const update = useUpdateCategory();

  const disabled = initialData ? update.isPending : create.isPending;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryForm>({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      image: initialData?.image || null,
      parent_id: parentId,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = async (data: CategoryForm) => {
    try {
      const formData = new FormData();
      console.log("Form data before append:", {
        name: data.name,
        description: data.description,
        parentId: parentId,
      });

      formData.append("name", String(data.name).trim());
      formData.append("description", String(data.description).trim());

      if (parentId) {
        formData.append("parent_id", String(parentId).trim());
      }

      if (imageFile) {
        formData.append("file", imageFile);
      }

      Array.from(formData.entries()).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });

      if (initialData) {
        formData.append("id", String(initialData.id));
        console.log(formData.get("id"));
        update.mutate(formData);
      } else {
        create.mutate(formData);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <FormInput
            label="Name"
            id="name"
            register={register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            error={errors.name}
            placeholder="Category name"
          />
          <FormInput
            label="Description"
            id="description"
            register={register("description", {
              required: "Description is required",
              minLength: {
                value: 3,
                message: "Description must be at least 10 characters",
              },
            })}
            error={errors.description}
            placeholder="Category Description"
          />

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Image Upload</h3>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image")?.click()}
                  className="w-full">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Select Image
                </Button>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              {imagePreview && (
                <div className="mt-2">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={300}
                    height={200}
                    className="max-w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={disabled}>
            {isSubmitting
              ? "Saving..."
              : initialData
              ? "Update Category"
              : "Create Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
