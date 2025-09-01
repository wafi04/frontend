import { api } from "@/lib/axios";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { ProductWithProvider } from "@/shared/types/productWithProvider";
import { API_RESPONSE, ApiPagination } from "@/shared/types/response";
import { useQuery } from "@tanstack/react-query";

export interface FilterRequest {
  limit: string;
  page?: string;
  search?: string;
}
export function useGetProductWithProvider(filters?: FilterRequest) {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "product-with-provider",
      filters?.limit,
      filters?.page,
      filters?.search,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("page", filters.page);
      if (filters?.search) params.append("search", filters.search);

      const req = await api.get<ApiPagination<ProductWithProvider[]>>(
        `/products?${params.toString()}`
      );
      return req.data;
    },
    staleTime: 3 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return {
    data: data?.data,
    isLoading,
    error,
  };
}
