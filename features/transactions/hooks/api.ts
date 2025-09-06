import { FilterRequest } from "@/features/product/hooks/api";
import { api } from "@/lib/axios";
import { API_RESPONSE, ApiPagination } from "@/shared/types/response";
import {
  CreateTransactions,
  DashboardStats,
  Transactions,
} from "@/shared/types/transaction";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface TransactionResponse {
  status: string;
  referenceID: string;
  productName: string;
  fee: number;
  methodName: string;
  no_tujuan: string;
  nickname: string;
}

export function useGetAllTransactions(filters: FilterRequest) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("page", filters.page);
      if (filters?.search) params.append("search", filters.search);
      const data = await api.get<ApiPagination<Transactions[]>>(
        `/transactions?${params.toString()}`
      );
      return data.data;
    },
    staleTime: 5 * 6000,
    gcTime: 5 * 6000,
  });

  return {
    data,
    isLoading,
    error,
  };
}
export function useGetTransactionsStats() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions-stats"],
    queryFn: async () => {
      // const params = new URLSearchParams();

      const data = await api.get<API_RESPONSE<DashboardStats>>(
        `/transactions/stats`
      );
      return data.data;
    },
    staleTime: 5 * 6000,
    gcTime: 5 * 6000,
  });

  return {
    data: data?.data,
    isLoading,
    error,
  };
}

export function useCreateTransactions() {
  return useMutation({
    mutationKey: ["create-transactions"],
    mutationFn: async (data: CreateTransactions) => {
      const req = await api.post<API_RESPONSE<TransactionResponse>>(
        "/transactions",
        data
      );
      return req.data;
    },
    onSuccess: (data: any) => {
      console.log(data);
    },
  });
}
