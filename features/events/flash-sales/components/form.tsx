"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateFlashSaleRequest } from "@/shared/types/flash-sales";
import { useCreateFlashSale, useUpdateflashsale } from "../api/api";
import { ImageUpload } from "@/shared/components/upload/imageForm";

const formSchema = z.object({
  title: z.string().min(1, "Title wajib diisi"),
  description: z.string().optional(),
  start_at: z.string().datetime("StartAt wajib RFC3339"),
  end_at: z.string().datetime("EndAt wajib RFC3339"),
  usage_limit: z.coerce.number().int().nullable().optional(),
  usage_per_user: z.coerce.number().int().positive("Harus lebih dari 0"),
  is_active: z.boolean(),
  banner_url: z.string().url("URL tidak valid").nullable().optional(),
});

type CreateFlashSaleFormValues = z.infer<typeof formSchema>;

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/upload/image', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Upload failed');
  }
  
  const data = await response.json();
  return data.url; 
};

export function FormFlashSale({
  id,
  initialData,
}: {
  initialData?: CreateFlashSaleRequest;
  id?: number;
}) {
  const { mutate, isPending } = useCreateFlashSale();
  const { mutate: updateMutate, isPending: updatePending } =
    useUpdateflashsale();
    
  const form = useForm<CreateFlashSaleFormValues>({
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      start_at: initialData?.start_at ?? "",
      end_at: initialData?.end_at ?? "",
      usage_limit: initialData?.usage_limit ?? null,
      usage_per_user: initialData?.usage_per_user ?? 1,
      is_active: initialData?.is_active ?? true,
      banner_url: initialData?.banner_url ?? "",
    },
  });

  const toRFC3339 = (val: string) => {
    if (!val) return val;
    return `${val}:00Z`;
  };

  const onSubmit = (data: CreateFlashSaleFormValues) => {
    const payload: CreateFlashSaleRequest = {
      ...data,
      start_at: toRFC3339(data.start_at),
      usage_limit: data.usage_limit ? Number(data.usage_limit) : null,
      end_at: toRFC3339(data.end_at),
    };

    if (initialData && id) {
      updateMutate({ ...payload, id });
    } else {
      mutate(payload);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Judul flash sale" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Deskripsi flash sale"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Banner Upload Section */}
        <FormField
          control={form.control}
          name="banner_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Image</FormLabel>
              <FormControl>
                <ImageUpload
                  onUpload={uploadImage}
                  onUrlChange={field.onChange}
                  currentUrl={field.value || undefined}
                  className="w-full"
                  maxSize={5} // 5MB
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start At</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End At</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="usage_limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usage Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Unlimited"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="usage_per_user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usage Per User</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Status</FormLabel>
                <div className="text-sm text-gray-500">
                  Enable or disable this flash sale
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isPending || updatePending}
        >
          {(isPending || updatePending) ? "Saving..." : "Save Flash Sale"}
        </Button>
      </form>
    </Form>
  );
}