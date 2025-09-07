export type DiscountType = "percentage" | "fixed";

export interface FlashSale {
  banner_url: string | null;
  created_at: string;
  description: string;
  end_at: string;
  id: number;
  is_active: boolean;
  start_at: string;
  title: string;
  updated_at: string;
  usage_limit: number;
  usage_per_user: number;
}
export interface CreateFlashSaleRequest {
  title: string;
  description?: string;
  start_at: string; // RFC3339
  end_at: string
  usage_limit?: number | null;
  usage_per_user: number;
  is_active: boolean;
  banner_url?: string | null;
}
