import { api } from "@/lib/axios";
import { API_RESPONSE, ApiPagination } from "@/shared/types/response";
import { SubCategory } from "@/shared/types/subcategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllSubCategory() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const data = await api.get<ApiPagination<SubCategory[]>>("/subcategory");
      return data.data;
    },
    staleTime: 60000,
    gcTime: 60000,
  });

  return {
    data: data?.data.data || [],
    meta: data?.data.meta,
    isLoading,
    error,
  };
}

export function useGetSubCategoryById(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subcategory", id],
    queryFn: async () => {
      const data = await api.get<{ data: SubCategory }>(`/subcategory/${id}`);
      return data.data;
    },
    staleTime: 60000,
    gcTime: 60000,
    enabled: !!id,
  });

  return {
    data: data?.data ,
    isLoading,
    error,
  };
}

export function useGetSubCategoryByCategories(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subcategories", "category", id],
    queryFn: async () => {
      const data = await api.get<{ data: SubCategory[] }>(`/subcategory/type/${id}`);
      return data.data;
    },
    staleTime: 60000,
    gcTime: 60000,
    enabled: !!id,
  });

  return {
    data: data?.data ?? [],
    isLoading,
    error,
  };
}

export function useUpdateSubCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<SubCategory>;
    }) => api.put<API_RESPONSE<SubCategory>>(`/subcategory/${id}`, payload),
    onSuccess: (data, variables) => {
      // Invalidate and refetch all related queries
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["subcategory", variables.id] });
      
      // If you have category information, also invalidate category-specific queries
      // queryClient.invalidateQueries({ queryKey: ["subcategories", "category"] });
    },
  });
}

export function useDeleteSubCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api.delete<API_RESPONSE<SubCategory>>(`/subcategory/${id}`),
    onSuccess: (data, variables) => {
      // Invalidate and refetch all related queries
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["subcategory", variables] });
      queryClient.invalidateQueries({ queryKey: ["subcategories", "category"] });
    },
  });
}