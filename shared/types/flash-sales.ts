export type DiscountType = "percentage" | "fixed";

export interface FlashSale {
  ID: number;
  Title: string;
  Description?: string;
  StartAt: string;
  EndAt: string;
  DiscountType: DiscountType;
  DiscountValue: number;
  MaxDiscount?: number;
  MinPurchase: number;
  UsageLimit?: number;
  UsagePerUser: number;
  IsActive: boolean;
  BannerUrl?: string;
  CreatedAt: string;
  UpdatedAt: string;
}
export interface CreateFlashSaleRequest {
  title: string;
  description?: string;
  start_at: string; // RFC3339
  end_at: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  max_discount?: number | null;
  min_purchase: number;
  usage_limit?: number | null;
  usage_per_user: number;
  is_active: boolean;
  banner_url?: string | null;
}
