import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api";
import { API_RESPONSE } from "@/types/interfaces";

export function useCreateOrUpdateInventory(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["inventory"],
    mutationFn: async (data: any) => {
      const req = await api.post("/stock", data);
      return req.data;
    },
    onError: () => {
      toast.error("Internal Server Error");
      queryClient.cancelQueries({ queryKey: ["inventory"] });
    },
    onSuccess: () => {
      toast.success("Create Inventory Success");
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });
}

export function useGetInventoryByVariant(id: string, options = {}) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["inventory", id], // Include `id` in the query key for uniqueness
    queryFn: async () => {
      const req = await api.get(`/stock/${id}`);
      return req.data;
    },
    staleTime: 1 * 24 * 60 * 60 * 1000,
    gcTime: 2 * 24 * 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!id, // Ensure the query is only enabled if `id` is valid
    ...options, // Allow overriding options
  });
  return {
    data,
    isLoading,
    error,
  };
}
