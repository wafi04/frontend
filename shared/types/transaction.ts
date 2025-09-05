export interface Transactions {
  amount: number;
  branchName: string;
  createdAt: string;
  fee: number;
  hargaModal: number;
  id: number;
  nickname: string;
  noTujuan: string;
  paymentMethod: string;
  productName: string;
  profit: number;
  profitKeterangan: string;
  providerName: string;
  referenceId: string;
  status: string;
  totalAmount: number;
  transactionType: string;
  updatedAt: string;
  username: string;
}

export interface CreateTransactions {
  type: "deposit" | "topup";
  productCode: string;
  noTujuan: string;
  nickname: string;
  paymentMethod: string;
}
export interface DashboardStats {
  total_transactions: number;
  total_amount: number;
  total_profit: number;
  total_fee: number;
  pending_count: number;
  success_count: number;
  failed_count: number;
  error_count: number;
  success_rate: number;
  today_transactions: number;
  today_amount: number;
  today_profit: number;

  hourly_stats: HourlyStat[];
  top_products: TopProduct[];
  payment_methods: PaymentMethod[];
  provider_stats: ProviderStat[];
  recent_transactions: RecentTransaction[];
}

export interface HourlyStat {
  hour: number;
  count: number;
  amount: number;
  success_rate: number;
}

export interface TopProduct {
  product_id: number;
  product_code: string;
  count: number;
  amount: number;
  profit: number;
}

export interface PaymentMethod {
  method: string;
  count: number;
  amount: number;
  fee: number;
  success_rate: number;
}

export interface ProviderStat {
  provider_id: number;
  count: number;
  amount: number;
  success_rate: number;
}

export interface RecentTransaction {
  id: number;
  reference_id: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED" | string;
  payment_method: string;
  created_at: string; // bisa di-convert ke Date di runtime
  no_tujuan: string;
  nickname: string;
}
