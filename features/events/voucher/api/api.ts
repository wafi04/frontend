import { api } from "@/lib/axios";
import { API_RESPONSE } from "@/shared/types/response";
import { CreateVoucherRequest, VoucherData } from "@/shared/types/voucher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateVoucherRequest) => {
      const validateData = {
        ...data,
        validFrom: new Date(data.validFrom),
        validUntil: new Date(data.validUntil),
      };
      const response = await api.post("/voucher", validateData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate dan refetch vouchers list setelah create berhasil
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      queryClient.invalidateQueries({
        queryKey: ["vouchers-active"],
      });
    },
  });
}

export function useDeleteVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/voucher/${id}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate dan refetch vouchers list setelah create berhasil
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      queryClient.invalidateQueries({
        queryKey: ["vouchers-active"],
      });
    },
  });
}
export function useUpdateVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: CreateVoucherRequest & { id: number }) => {
      const validateData = {
        ...data,
        validFrom: new Date(data.validFrom),
        validUntil: new Date(data.validUntil),
      };
      const response = await api.put(`/voucher/${id}`, validateData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate dan refetch vouchers list setelah update berhasil
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      queryClient.invalidateQueries({ queryKey: ["vouchers-active"] });
    },
  });
}

// Hook untuk fetch vouchers list (menggunakan useQuery)
export function useGetVouchers() {
  return useQuery({
    queryKey: ["vouchers"],
    queryFn: async () => {
      const response = await api.get<API_RESPONSE<VoucherData[]>>("/voucher"); // atau endpoint yang sesuai
      return response.data;
    },
    staleTime: 5 * 60000, // 5 menit (bukan 6000ms)
    gcTime: 5 * 60000,
  });
}
export function useGetActiveVouchers() {
  return useQuery({
    queryKey: ["vouchers-active"],
    queryFn: async () => {
      const response = await api.get<API_RESPONSE<VoucherData[]>>(
        "/voucher/active"
      ); // atau endpoint yang sesuai
      return response.data;
    },
    staleTime: 5 * 60000, // 5 menit (bukan 6000ms)
    gcTime: 5 * 60000,
  });
}
