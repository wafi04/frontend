export interface ProductVariantsResponse {
  variants: VariantsData[];
}

export interface VariantsForm {
  color: string;
  productId: string;
  images: File[];
}

export interface VariantImage {
  id: string;
  url: string;
  isMain: boolean;
  variant_id: string;
}
export interface VariantsData {
  id: string;
  color: string;
  images: VariantImage[];
  sku: string;
  product_id: string;
  inventory: inventory[];
  price: number;
}

export interface inventory {
  variantd_id: string;
  id: string;
  size: string;
  stock: number;
  available_stock: number;
  created_at: number;
  updated_at: number;
}

export interface VariantsForm {
  color: string;
  variantsId: string | null;
}
