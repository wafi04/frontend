import { api } from "@/lib/axios";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { ProductWithProvider } from "@/shared/types/productWithProvider";
import { API_RESPONSE, ApiPagination } from "@/shared/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface FilterRequest {
  limit: string;
  page?: string;
  search?: string;
}

interface Product {
  hargaModal: number;
  id: number;
  isActive: boolean;
  productCode: string;
  product_name: string;
}
export interface UpsertProduct {
  product_name: string;
  productCode: string;
  categoryID: number;
  subCategoryID: number;
  hargaModal: number;
  mainProviderId: number;
  isActive: boolean;
}
export interface ProductData {
  id: number;
  createdAt: string;
  updatedAt: string;

  product_name: string;
  productCode: string;
  subCategoryID: number;
  hargaModal: number;
  mainProviderId: number;
  isActive: boolean;
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

export function useGetAllSearchProduct(search?: string) {
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, error } = useQuery({
    queryKey: ["search-products", search],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<Product[]>>(
        `/products/search?query=${debouncedSearch}`
      );
      return req.data;
    },
    staleTime: 5 * 6000,
    gcTime: 5 * 6000,
    enabled: !!search,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createProduct"],
    mutationFn: async (data: UpsertProduct) => {
      const res = await api.post("/products", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-with-provider", 1, 1],
      });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: async ({
      productId,
      data,
    }: {
      productId: number;
      data: {
        product_name: string;
        productCode?: string;
        mainProviderId: number;
        isActive: boolean;
      };
    }) => {
      const res = await api.put(`/products/${productId}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-with-provider", 1, 1], // bisa disesuaikan
      });
    },
  });
}

export function useDeleteProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteProducts"],
    mutationFn: async (id: number) => {
      const res = await api.delete(`/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-with-provider", 1, 1],
      });
    },
  });
}
