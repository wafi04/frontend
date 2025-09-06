import { CreateVoucherRequest } from "@/shared/types/voucher";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Info } from "lucide-react";
import { useCreateVoucher, useUpdateVoucher } from "../../api/api";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Schema validation dengan Zod - Updated untuk mendukung multiple discount types
const voucherSchema = z
  .object({
    code: z
      .string()
      .min(1, "Code is required")
      .max(50, "Code max 50 characters"),
    type: z.enum(["FIXED", "PERCENTAGE", "HYBRID"], {
      message: "Please select a voucher type",
    }),
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title max 100 characters"),
    description: z.string().optional(),
    amount: z.number().min(0, "Amount must be positive").default(0),
    percentage: z
      .number()
      .min(0, "Percentage must be positive")
      .max(100, "Percentage max 100")
      .default(0),
    maxDiscount: z.number().min(0, "Max discount must be positive").default(0),
    minCartValue: z
      .number()
      .min(0, "Min cart value must be positive")
      .default(0),
    status: z.string(),
    issuedQty: z
      .number()
      .min(1, "Issued quantity must be at least 1")
      .default(1),
    usedCount: z.number().min(0).default(0),
    usedLimit: z.number().min(1, "Used limit must be at least 1").default(1),
    usagePerUser: z
      .number()
      .min(1, "Usage per user must be at least 1")
      .default(1),
    validFrom: z.string().min(1, "Valid from date is required"),
    validUntil: z.string().min(1, "Valid until date is required"),
    isActive: z.boolean().default(true),
  })
  .refine(
    (data) => {
      // Validate based on voucher type
      if (data.type === "FIXED") {
        return data.amount > 0;
      } else if (data.type === "PERCENTAGE") {
        return data.percentage > 0;
      } else if (data.type === "HYBRID") {
        // For hybrid, at least one must be greater than 0
        return data.amount > 0 || data.percentage > 0;
      }
      return true;
    },
    {
      message: "Invalid discount configuration for selected type",
      path: ["type"],
    }
  )
  .refine(
    (data) => {
      // Validate dates
      if (data.validFrom && data.validUntil) {
        return new Date(data.validFrom) < new Date(data.validUntil);
      }
      return true;
    },
    {
      message: "Valid from date must be before valid until date",
      path: ["validUntil"],
    }
  );

export type VoucherFormData = z.infer<typeof voucherSchema>;

export function VoucherForm({
  initialData,
  Id,
}: {
  initialData?: VoucherFormData;
  Id?: number;
}) {
  const { mutate, isPending } = useCreateVoucher();
  const { mutate: updateMutate, isPending: updatePending } = useUpdateVoucher();

  const form = useForm<VoucherFormData>({
    defaultValues: {
      code: initialData?.code ?? "",
      type: initialData?.type ?? "FIXED",
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      amount: initialData?.amount ?? 0,
      percentage: initialData?.percentage ?? 0,
      maxDiscount: initialData?.maxDiscount ?? 0,
      minCartValue: initialData?.minCartValue ?? 0,
      issuedQty: initialData?.issuedQty ?? 1,
      usedCount: initialData?.usedCount ?? 0,
      usedLimit: initialData?.usedLimit ?? 1,
      usagePerUser: initialData?.usagePerUser ?? 1,
      validFrom: initialData?.validFrom ?? "",
      validUntil: initialData?.validUntil ?? "",
      isActive: initialData?.isActive ?? true,
    },
  });

  const watchType = form.watch("type");
  const watchAmount = form.watch("amount");
  const watchPercentage = form.watch("percentage");

  const onSubmit = (data: VoucherFormData) => {
    // Clean up data based on type to avoid backend validation issues
    const cleanedData = { ...data };

    if (data.type === "FIXED") {
      cleanedData.percentage = 0;
      cleanedData.maxDiscount = 0;
    } else if (data.type === "PERCENTAGE") {
      cleanedData.amount = 0;
    }

    if (initialData && Id) {
      updateMutate({
        ...cleanedData,
        id: Id,
      });
    } else {
      mutate(cleanedData);
    }
  };

  const isLoading = isPending || updatePending;

  const renderDiscountInfo = () => {
    if (watchType === "HYBRID") {
      return (
        <Alert className="md:col-span-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Hybrid Mode:</strong> This voucher can apply both fixed
            amount and percentage discounts. The system will calculate both and
            apply the better discount for the customer.
            {watchAmount > 0 && watchPercentage > 0 && (
              <span className="block mt-1 text-sm text-muted-foreground">
                Current: Fixed ₹{watchAmount} OR {watchPercentage}% (whichever
                is better)
              </span>
            )}
          </AlertDescription>
        </Alert>
      );
    }
    return null;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Voucher Code</FormLabel>
                <FormControl>
                  <Input placeholder="VOUCHER2024" {...field} />
                </FormControl>
                <FormDescription>
                  Unique code that customers will use
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="New Year Sale" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Special discount for new year celebration..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type Selection */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Discount Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select voucher type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FIXED">Fixed Amount Only</SelectItem>
                    <SelectItem value="PERCENTAGE">Percentage Only</SelectItem>
                    <SelectItem value="HYBRID">
                      Hybrid (Best of Both)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {watchType === "FIXED" &&
                    "Customer gets fixed amount discount"}
                  {watchType === "PERCENTAGE" &&
                    "Customer gets percentage discount"}
                  {watchType === "HYBRID" &&
                    "System picks the better discount option"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount Info Alert */}
          {renderDiscountInfo()}

          {/* Amount (show for FIXED and HYBRID) */}
          {(watchType === "FIXED" || watchType === "HYBRID") && (
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Fixed Amount
                    {watchType === "HYBRID" && (
                      <span className="text-muted-foreground"> (Optional)</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="50000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Amount in IDR</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Percentage (show for PERCENTAGE and HYBRID) */}
          {(watchType === "PERCENTAGE" || watchType === "HYBRID") && (
            <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Percentage
                    {watchType === "HYBRID" && (
                      <span className="text-muted-foreground"> (Optional)</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10"
                      max="100"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Percentage discount (0-100%)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Max Discount (show for PERCENTAGE and HYBRID when percentage > 0) */}
          {(watchType === "PERCENTAGE" ||
            (watchType === "HYBRID" && watchPercentage > 0)) && (
            <FormField
              control={form.control}
              name="maxDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Discount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="100000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum discount amount in IDR
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Min Cart Value */}
          <FormField
            control={form.control}
            name="minCartValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Cart Value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="200000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Minimum cart value to use this voucher
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Valid From */}
          <FormField
            control={form.control}
            name="validFrom"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Valid From</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Valid Until */}
          <FormField
            control={form.control}
            name="validUntil"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Valid Until</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Issued Quantity */}
          <FormField
            control={form.control}
            name="issuedQty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issued Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Total vouchers to issue</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Used Limit */}
          <FormField
            control={form.control}
            name="usedLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usage Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  How many times this voucher can be used total
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Usage Per User */}
          <FormField
            control={form.control}
            name="usagePerUser"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usage Per User</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  How many times one user can use this voucher
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Is Active */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <FormLabel className="text-base">Active Status</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="min-w-[120px]" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset Form
          </Button>
        </div>
      </form>
    </Form>
  );
}
