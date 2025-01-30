export interface CategoryForm {
  id?: string;
  name: string;
  description: string;
  parent_id?: string;
  image: string | null | File;
}

export type CategoryUpdate = Partial<CategoryForm>;

export interface ListCategoriesResponse {
  categories: CategoryData[];
  limit: number;
  page: number;
  total: number;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  depth: number;
  parent_id: string | null;
  image: string | null;
  children: CategoryData[];
}
