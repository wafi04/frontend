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
  stock: number;
}

export interface VariantsForm {
  color: string;
  variantsId: string | null;
}
