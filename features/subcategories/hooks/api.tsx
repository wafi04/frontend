import { api } from "@/lib/axios";
import { API_RESPONSE, ApiPagination } from "@/types/response";
import { SubCategory } from "@/types/subcategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllSubCategory() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["all-subcategory"],
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
    data: data?.data,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-subcategory"] });
    },
  });
}

export function useDeleteSubCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api.delete<API_RESPONSE<SubCategory>>(`/subcategory/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-subcategory"] });
    },
  });
}
