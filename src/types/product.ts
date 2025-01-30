import { CategoryForm } from "./categories";
import { VariantsData } from "./variants";

export interface ProductForm {
  id?: string;
  name: string;
  sub_title : string;
  categoryId: string;
  description: string;
  price: number;
}


export interface ProductResponse {
    products : ProductData[]
}

export interface ProductData {
  categoryId: string;
  sub_title: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  price: number;
  sku: string;
  updatedAt: string | null;
  variants : VariantsData[]
}

export interface ProductDetails extends ProductData {
  variants: VariantsData[];
}
