export type DiscountType = "percentage" | "fixed";

export interface FlashSale {
  id: number;
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
