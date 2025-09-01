export interface SubCategory {
  id: number;
  name: string;
  subName: string;
  brand: string;
  thumbnail: string;
  bannerUrl: string;
  information: string;
  instruction: string;
  isActive: boolean;
  isCheckNickname: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductOrder {
  productName: string;
  productCode: string;
  productPrice: number;
}

export interface SubCategoryWithProducts {
  subCategoryName: string;
  subCategorySubName: string;
  subCategoryThumbnail: string;
  subCategoryBanner: string;
  productTypes: {
    products: ProductOrder[];
    typeName: string;
  }[];
}
