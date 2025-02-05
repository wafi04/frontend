import { ProductData } from "./product";
import { VariantsData } from "./variants";

export interface CartDto {
  variant_id: string;
  total: number;
  size: string;
  quantity: number;
  price: number;
}

export type CartData = {
  cart_id: string;
  user_id: string;
  total: number;
  created_at: string;
  updated_at: string;
  cart_items: CartItem[];
};

export interface Variants extends VariantsData {
  sku: string;
}

export type CartItem = {
  cart_item_id: string;
  cart_id: string;
  variant_id: string;
  color: string;
  sku: string;
  product_name: string;
  size: string;
  sub_total: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  image_url: string;
};
