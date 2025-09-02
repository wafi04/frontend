import { api } from "@/lib/axios";
import { FlashSale } from "@/shared/types/flash-sales";
import { API_RESPONSE } from "@/shared/types/response";
import { useQuery } from "@tanstack/react-query";

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
