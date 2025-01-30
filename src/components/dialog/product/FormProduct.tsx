import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProductForm } from "@/types/product";
import { CategoryData } from "@/types/categories";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { productSchema } from "@/schema";
import { useGetCategory } from "@/lib/api/categories/category.query";
import { UseCreateProduct, useUpdateProduct } from "@/lib/api/products/product.query";


export function FormProduct({
  open,
  initialData,
  onClose,
  title,
  text,
  textSubmiting,
  subTitle,
}: {
  title: string;
  subTitle: string;
  open: boolean;
  text: string;
  textSubmiting: string;
  onClose: () => void;
  initialData?: ProductForm;
}) {
  const { category: categories, isLoading, error } = useGetCategory();
  const { mutate } = UseCreateProduct();
  const update = useUpdateProduct();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      categoryId: "",
      description: initialData?.description || "",
      sub_title  :  initialData?.sub_title || "",
      name: initialData?.name || "",
      price: initialData?.price || 0,
    },
  });


  console.log(initialData)

  const flattenedCategories = useMemo(() => {
    if (!categories)  return []
    const flatten = (cats: CategoryData[], depth = 0): CategoryData[] => {
      return cats.flatMap((cat) => [
        { ...cat, depth },
        ...flatten(cat.children || [], depth + 1),
      ]);
    };
    return flatten(categories || []);
  }, [categories]);

  const onSubmit = async (data: ProductForm) => {
    console.log(data.sub_title)
    if (initialData) {

      update.mutate({
        ...data,
        id: initialData.id,

        sub_title : data.sub_title,
      });
    } else {
      mutate(data);
      reset();
    }
  };

  console.log("Flattened Categories:", categories);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        <Card className="w-full max-w-2xl mx-auto overflow-y-auto p-4">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-2">Product Name</label>
                <Input {...register("name")} placeholder="Enter product name" />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2">Subtitle</label>
                <Input {...register("sub_title")} placeholder="Enter subtitle name" />
                {errors.sub_title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.sub_title.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2">Price</label>
                <Input
                  {...register("price")}
                  placeholder="Enter price"
                  type="number"
                  inputMode="numeric"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>


              {/* Category Selector */}
              <div>
                <label className="block mb-2">Category</label>
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <span>Loading categories...</span>
                  </div>
                ) : error ? (
                  <div className="text-red-500">
                    Failed to load categories. Please try again later.
                  </div>
                ) : (
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {flattenedCategories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.depth > 0 && (
                                <span className="mr-2 text-gray-400">
                                  {"—".repeat(cat.depth)}
                                </span>
                              )}
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}
                {errors.categoryId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2">Description</label>
                <Textarea
                  {...register("description")}
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? `${textSubmiting}` : `${text}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}