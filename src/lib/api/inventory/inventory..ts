import { InventoryForm } from "@/types/variants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api";

export function useCreateOrUpdateInventory(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["inventory"],
    mutationFn: async (data: InventoryForm[]) => {
     const req = await api.post("/stock",data)
     return req.data
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
