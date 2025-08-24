import { api } from "@/lib/axios";
import { PaymentMethod, UpdateMethodData } from "@/types/method";
import { API_RESPONSE, ApiPagination } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllMethod() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["methods"],
    queryFn: async () => {
      const data = await api.get<ApiPagination<PaymentMethod[]>>("/method");
      return data.data;
    },
    staleTime: 360000,
    gcTime: 1000 * 60 * 60 * 24 * 1,
  });
  return {
    data,
    isLoading,
    error,
  };
}

// export function useGetById(id: number) {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["", id],
//     queryFn: async () => {
//       const data = await api.get<API_RESPONSE<>>(`//${id}`);
//       return data.data;
//     },
//     staleTime: 5 * 6000,
//     gcTime: 5 * 6000,
//   });
//   return {
//     data,
//     isLoading,
//     error,
//   };
// }

// export function useGetByType(type: string) {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["", type],
//     queryFn: async () => {
//       const data = await api.get<API_RESPONSE<[]>>(
//         `//type/${type}`
//       );
//       return data.data;
//     },
//     staleTime: 5 * 6000,
//     gcTime: 5 * 6000,
//   });
//   return {
//     data,
//     isLoading,
//     error,
//   };
// }

// export function useCreate() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (
//       payload: Omit<, "id" | "created_at" | "updated_at" | "sort_order">
//     ) => api.post<API_RESPONSE<>>("/", payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["methods"] });
//     },
//   });
// }

export function useUpdateMethodMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<UpdateMethodData>;
    }) => api.put<API_RESPONSE<null>>(`/method/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["methods"] });
    },
  });
}

export function useDeleteMethodMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete<API_RESPONSE<null>>(`/method/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["methods"] });
    },
  });
}
