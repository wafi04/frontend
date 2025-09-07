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
  methods: MethodResponseByType[];
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

export type MethodResponseByType = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  image: string
  type: "virtual-account" | "e-wallet" | "qris" | string; // bisa diperluas sesuai enum di DB
  minAmount: number | null;
  maxAmount: number | null;
  status: "active" | "inactive" | string;
  fee_amount: number;
  fee_percentage: number;
  calculation_type: "fixed" | "percentage" | "hybrid";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
