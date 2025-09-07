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
export interface UpsertFlashSale {
  title: string; // required
  description?: string | null;
  start_at: string; // required
  end_at: string; // required
  is_active: boolean;
  products: UpsertFlashSaleProducts[];
}

export interface UpsertFlashSaleProducts {
  productId: number;
  originalPrice: number;
  stockReserved: number;
  stockSold: number;
  flashSalePrice: number;
  thumbnail: string;
  usagePerUser: number;
}
