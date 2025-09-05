import { FilterRequest } from "@/features/product/hooks/api";
import { api } from "@/lib/axios";
import { API_RESPONSE, ApiPagination } from "@/shared/types/response";
import {
  CreateSubCategory,
  SubCategory,
  SubCategoryWithProducts,
} from "@/shared/types/subcategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllSubCategory(filters?: FilterRequest) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subcategories", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("page", filters.page);
      if (filters?.search) params.append("search", filters.search);
      const data = await api.get<ApiPagination<SubCategory[]>>(
        `/subcategory?${params.toString()}`
      );
      return data.data;
    },
    staleTime: 60000,
    gcTime: 60000,
  });

  return {
    data: data,
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

export function useGetSubCategoryBySubName(code: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subcategory-code", code],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<SubCategoryWithProducts>>(
        `/subcategory/code?subName=${code}`
      );
      return data.data;
    },
    staleTime: 60000,
    gcTime: 60000,
    enabled: !!code,
  });

  return {
    data: data,
    isLoading,
    error,
  };
}

export function useGetSubCategoryByCategories(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subcategories", "category", id],
    queryFn: async () => {
      const data = await api.get<{ data: SubCategory[] }>(
        `/subcategory/type/${id}`
      );
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
      queryClient.invalidateQueries({
        queryKey: ["subcategory", variables.id],
      });

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
      queryClient.invalidateQueries({
        queryKey: ["subcategories", "category"],
      });
    },
  });
}


export function useCreateSubCategory(){
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey : ["create-sub-category"],
    mutationFn : async (data : CreateSubCategory)  => {
      const validateData = {
        ...data,
        categoryType : parseInt(data.categoryType)
      }
      const req = await api.post("/subcategory",validateData)
      return req.data
    },
     onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["subcategory", variables] });
      queryClient.invalidateQueries({
        queryKey: ["subcategories", "category"],
      });
    },
  })
}
