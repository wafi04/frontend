"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import { CreateVoucherRequest } from "@/shared/types/voucher";
import { useCreateFlashSale, useUpdateflashsale } from "../api/api";
const formSchema = z.object({
  title: z.string().min(1, "Title wajib diisi"),
  description: z.string().optional(),
  start_at: z.string().datetime("StartAt wajib RFC3339"),
  end_at: z.string().datetime("EndAt wajib RFC3339"),
  discount_type: z.enum(["percentage", "fixed"]),
  discount_value: z.coerce.number().positive("Harus lebih dari 0"),
  max_discount: z.coerce.number().nullable().optional(),
  min_purchase: z.coerce.number().min(0, "Tidak boleh negatif"),
  usage_limit: z.coerce.number().int().nullable().optional(),
  usage_per_user: z.coerce.number().int().positive("Harus lebih dari 0"),
  is_active: z.boolean(),
  banner_url: z.string().url("URL tidak valid").nullable().optional(),
});

type CreateFlashSaleFormValues = z.infer<typeof formSchema>;

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
      discount_type: initialData?.discount_type ?? "percentage",
      discount_value: initialData?.discount_value ?? 0,
      max_discount: initialData?.max_discount ?? null,
      min_purchase: initialData?.min_purchase ?? 0,
      usage_limit: initialData?.usage_limit ?? null,
      usage_per_user: initialData?.usage_per_user ?? 1,
      is_active: initialData?.is_active ?? true,
      banner_url: initialData?.banner_url ?? "",
    },
  });
  const toRFC3339 = (val: string) => {
    if (!val) return val;
    return `${val}:00Z`; // datetime-local → tambahkan detik + Z
  };

  const onSubmit = (data: CreateFlashSaleFormValues) => {
    const payload: CreateFlashSaleRequest = {
      ...data,
      start_at: toRFC3339(data.start_at),
      max_discount: data.max_discount ? Number(data.max_discount) : null,
      min_purchase: Number(data.min_purchase),
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  placeholder="deskripsi"
                  {...field}
                  value={field.value ?? ""}
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

        <FormField
          control={form.control}
          name="discount_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="discount_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="max_discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Discount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="min_purchase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Purchase</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="usage_limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usage Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <FormLabel className="text-base">Active</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="banner_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/banner.png"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Flash Sale
        </Button>
      </form>
    </Form>
  );
}
