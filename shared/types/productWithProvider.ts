export type ProductWithProvider = {
  productId: number;
  productName: string;
  productHargaModal: number;
  productMainProvider: number;
  productIsActive: boolean;
  productCode: string;
  updatedAt: string;
  providers : ProviderData[]
};

export type ProviderData = {
  providerId: number;
  providerName: string;
  hargaModal: number;
  isActive: boolean;
  rolePrices : RolePrices[]
};

export type RolePrices = {
  roleName: string;
  price: number;
};
