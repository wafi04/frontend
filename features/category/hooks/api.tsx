import { FilterRequest } from "@/features/product/hooks/api";
import { api } from "@/lib/axios";
import { Category } from "@/shared/types/category";
import { API_RESPONSE, ApiPagination } from "@/shared/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllCategory({ filters }: { filters?: FilterRequest }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("page", filters.page);
      if (filters?.search) params.append("search", filters.search);
      const data = await api.get<ApiPagination<Category[]>>(
        `/category?${params.toString()}`
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

export function useGetAllCategoryActive() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<Category[]>>(`/category/all`);
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

export function useGetCategoryById(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<Category>>(`/category/${id}`);
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

export function useGetCategoryByType(type: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", type],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<Category[]>>(
        `/category/type/${type}`
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

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      payload: Omit<Category, "id" | "created_at" | "updated_at" | "sort_order">
    ) => api.post<API_RESPONSE<Category>>("/category", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<Category> }) =>
      api.put<API_RESPONSE<Category>>(`/category/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api.delete<API_RESPONSE<Category>>(`/category/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
