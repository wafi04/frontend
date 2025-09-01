export interface PaymentMethod {
  id: number;
  name: string;
  image: string;
  code: string;
  description: string;
  type: string;
  minAmount: number;
  fee: number;
  feeType: string;
  maxAmount: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
export type ResponseMethod = {
  type: string;
  methods: PaymentMethod[];
};
export interface CreateMethodData {
  code: string;
  name: string;
  description?: string;
  type: string;
  image?: string;
  minAmount?: number; // default 0 kalau nggak ada
  maxAmount?: number; // default 0 kalau nggak ada
  fee?: number;
  feeType?: string;
  status?: string;
}

export interface UpdateMethodData {
  name?: string;
  description?: string;
  type?: string;
  code?: string;
  image?: string;
  minAmount?: number;
  maxAmount?: number;
  fee?: number;
  feeType?: string;
  status?: string;
}
