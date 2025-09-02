import { FilterRequest } from "@/features/product/hooks/api";
import { api } from "@/lib/axios";
import { ApiPagination } from "@/shared/types/response";
import { Transactions } from "@/shared/types/transaction";
import { useQuery } from "@tanstack/react-query";

export function useGetAllTransactions(filters: FilterRequest) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("page", filters.page);
      if (filters?.search) params.append("search", filters.search);
      const data = await api.get<ApiPagination<Transactions[]>>(`/transactions?${params.toString()}`);
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
