import { api } from "@/lib/axios";
import { CreateFlashSaleRequest, FlashSale } from "@/shared/types/flash-sales";
import { API_RESPONSE } from "@/shared/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function UseGetAllFlashSales() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["flash-sales"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<FlashSale[]>>("/flash-sales");
      return req.data;
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

export function useCreateFlashSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateFlashSaleRequest) => {
      const response = await api.post("/flash-sales", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate dan refetch flashsales list setelah create berhasil
      queryClient.invalidateQueries({ queryKey: ["flash-sales"] });
      queryClient.invalidateQueries({
        queryKey: ["flash-sales-active"],
      });
    },
  });
}
export function useCreateProductFlashSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { flashSaleId: number; productIds: number[] }) => {
      const response = await api.post("/pfs", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate dan refetch flashsales list setelah create berhasil
      queryClient.invalidateQueries({ queryKey: ["flash-sales"] });
      queryClient.invalidateQueries({
        queryKey: ["flash-sales-active"],
      });
    },
  });
}
export function useDeleteflashsale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/flash-sales/${id}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate dan refetch flashsales list setelah create berhasil
      queryClient.invalidateQueries({ queryKey: ["flash-sales"] });
      queryClient.invalidateQueries({
        queryKey: ["flash-sales-active"],
      });
    },
  });
}
export function useUpdateflashsale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: CreateFlashSaleRequest & { id: number }) => {
      const response = await api.put(`/flash-sales/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate dan refetch flashsales list setelah update berhasil
      queryClient.invalidateQueries({ queryKey: ["flash-sales"] });
      queryClient.invalidateQueries({ queryKey: ["flash-sales-active"] });
    },
  });
}
