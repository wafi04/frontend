import { z } from "zod";

export const InventoryFormSchema = z.object({
  size: z.string().min(1, { message: "Size is required" }),
  stock: z
    .number()
    .int()
    .min(0, { message: "Stock must be a non-negative number" }),
  availableStock: z
    .number()
    .int()
    .min(0, { message: "Available stock must be a non-negative number" }),
});

export const VariantsFormSchema = z.object({
  color: z.string().min(1, { message: "Color is required" }),
  productId: z.string().min(1, { message: "Product ID is required" }),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one image is required" }),
  inventory: z
    .array(InventoryFormSchema)
    .min(1, { message: "At least one inventory entry is required" }),
});


export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number(),
  categoryId: z.string().min(1, { message: "Please select a category" }),
  sub_title: z.string().min(1, { message: "Please input subtitle" }),
  id: z.string().min(1, { message: "ID is required" }).optional(), // Corrected optional field
});
export type ProductForm = z.infer<typeof productSchema>
export type VariantsForm = z.infer<typeof VariantsFormSchema>;
