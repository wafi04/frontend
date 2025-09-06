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
  subCategoryId : number
  subCategoryName: string;
  subCategorySubName: string;
  subCategoryThumbnail: string;
  subCategoryBanner: string;
  productTypes: {
    products: ProductOrder[];
    typeName: string;
  }[];
}


export interface CreateSubCategory {
  name : string
subName : string
brand : string
categoryType : string
	thumbnail : string
	bannerUrl : string
isActive : boolean
instruction : string
information : string
isCheckNickname : boolean
}
