import { api } from "@/lib/axios";
import { API_RESPONSE } from "@/shared/types/response";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export interface Fees {
  id: number;
  referenceId: number;
  referenceName: string;
  feeAmount?: number | null;
  feePercentage?: number | null;
  calculationType?: string | null;
  isActive: boolean;
  createdAt: string;  // karena time.Time biasanya dikirim sebagai string ISO
  updatedAt: string;
}

export function useGetFeesByReferenceId(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fees", id],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<Fees[]>>(`/fees/${id}`);
      return req.data;
    },
    enabled: !!id, 
  });

  return { data, isLoading, error };
}

// ✅ CREATE
export function useCreateFee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Fees) => {
      const res = await api.post("/fees", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fees"] });
      toast.success("Create Fees Successfully")
    },
  });
}

// ✅ UPDATE
export function useUpdateFee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: Fees }) => {
      const res = await api.put(`/fees/${id}`, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["fees", variables.id] });
            toast.success("Update Fees Successfully")

    },
  });
}

// ✅ DELETE
export function useDeleteFee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/fees/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fees"] });
            toast.success("Delete Fees Successfully")

    },
  });
}
