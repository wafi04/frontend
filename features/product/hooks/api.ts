import { api } from "@/lib/axios";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { ProductWithProvider } from "@/shared/types/productWithProvider";
import { API_RESPONSE, ApiPagination } from "@/shared/types/response";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

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

interface Product {
hargaModal: number
id: number
isActive: boolean
productCode: string
product_name: string
}


export function useGetAllSearchProduct(search? : string){
  const debouncedSearch = useDebounce(search,500)
  const {
    data,
    isLoading,
    error
  } = useQuery({
      queryKey : ['search-products',search],
      queryFn : async ()  => {
        const req = await api.get<API_RESPONSE<Product[]>>(`/products/search?query=${debouncedSearch}`)
        return req.data
      },
      staleTime : 5 * 6000,
     gcTime : 5 * 6000,
      enabled : !!search
  })


  return {
    data,
    isLoading,
    error
  }
}