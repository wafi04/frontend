import { z } from "zod";

export const ShippingReqData = z.object({
  recipient_name: z.string().min(1, "Recipient name is required"),
  recipient_phone: z.string().min(1, "Recipient phone is required"),
  full_address: z.string().min(1, "Full address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  label: z.string().optional(),
  is_default: z.boolean(),
});
const update = ShippingReqData.optional();
export type ShippingReqType = z.infer<typeof ShippingReqData>;
export type ShippingUpdateReqType = z.infer<typeof update>;
