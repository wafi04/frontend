export type CategoryType = "games" | "voucher" | "pulsa" | "ewallet" | "pln";
export type CategoryOmit = Omit<Category, "created_at" | "updated_at">;
export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  type: CategoryType;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryCreate {
  name: string;
  description: string;
  icon: string;
  type: CategoryType;
  is_active: boolean;
  
}

export interface CategoryUpdate {
  name?: string;
  description?: string;
  icon?: string;
  type?: CategoryType;
  is_active?: boolean;
  sort_order?: number;
}

export interface CategoryCreate {
  name: string;
  description: string;
  icon: string;
  type: CategoryType;
  is_active: boolean;
}
