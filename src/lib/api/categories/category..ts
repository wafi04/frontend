import {
  CategoryData,
  CategoryForm,
  ListCategoriesResponse,
} from "@/types/categories";
import { API_RESPONSE } from "@/types/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["category"],
    mutationFn: async (formatData: FormData) => {
      const req = await api.post<API_RESPONSE<CategoryData>>(
        "/category",
        formatData,
        { isMultipart: true }
      );
      return req.data;
    },
    onSuccess: (serverResponse, newCategory, context) => {
      queryClient.invalidateQueries({ queryKey: ["category"] });

      toast.success("Create Category Success");
    },
    onError: () => {
      queryClient.cancelQueries({ queryKey: ["category"] });
      toast.error("Error Creating Category");
    },
  });
}

export function useGetCategory() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await api.get<API_RESPONSE<ListCategoriesResponse>>(
        "/category/list-categories"
      );

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: true,
  });

  return {
    category: data?.data.categories,
    error,
    isLoading,
  };
}
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["category"],
    mutationFn: async (formdata: FormData) => {
      const id = formdata.get("id") ?? "";
      const req = await api.put(`/category/update/${id}`, formdata, {
        isMultipart: true,
      });
      return req.data;
    },
    onMutate: async (updateCategory) => {
      await queryClient.cancelQueries({
        queryKey: ["category"],
      });
      const previousCategory = queryClient.getQueryData(["category"]);

      queryClient.setQueryData(
        ["category"],
        (oldData: API_RESPONSE<CategoryForm[]>) => {
          if (Array.isArray(oldData.data)) {
            return {
              ...oldData,
              data: oldData.data.map((category) =>
                category.id === updateCategory.get("id")
                  ? { ...category, ...updateCategory }
                  : category
              ),
            };
          }
          return oldData;
        }
      );
      return { previousCategory };
    },

    onSuccess: (serverResponse, updateCategory) => {
      toast.success("Update Categories Success");

      queryClient.setQueryData(
        ["category"],
        (oldData: API_RESPONSE<CategoryForm[]>) => {
          if (Array.isArray(oldData.data)) {
            return {
              ...oldData,
              data: oldData.data.map((category) =>
                category.id === updateCategory.get("id")
                  ? serverResponse
                  : category
              ),
            };
          }
          return oldData;
        }
      );

      queryClient.invalidateQueries({
        queryKey: ["category"],
        exact: false,
        refetchType: "active",
      });
    },

    onError: (error, updateCategory, context: any) => {
      toast.error("Error Updating Category");

      if (context?.previousCategory) {
        queryClient.setQueryData(["category"], context.previousCategory);
      }

      queryClient.cancelQueries({ queryKey: ["category"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["category"],
    mutationFn: async (categoryId: string) => {
      const req = await api.delete(`/category/${categoryId}`);
      return req.data;
    },
    // Optimistic update logic
    onMutate: async (categoryId: string) => {
      // Cancel any ongoing refetches
      await queryClient.cancelQueries({ queryKey: ["category"] });

      // Snapshot the previous data
      const previousCategories = queryClient.getQueryData([
        "category",
      ]) as API_RESPONSE<ListCategoriesResponse>;

      queryClient.setQueryData(
        ["category"],
        (old: API_RESPONSE<ListCategoriesResponse> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              categories: old.data.categories.filter(
                (category) => category.id !== categoryId
              ),
            },
          };
        }
      );

      // Return a context object with the snapshotted value
      return { previousCategories };
    },
    // Rollback if mutation fails
    onError: (
      err,
      categoryId,
      context:
        | { previousCategories: API_RESPONSE<ListCategoriesResponse> }
        | undefined
    ) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(["category"], context.previousCategories);
      }
      toast.error("Error Deleting Category");
    },
    // Ensure data is up to date after successful mutation
    onSuccess: () => {
      toast.success("Delete Categories Success");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
}
