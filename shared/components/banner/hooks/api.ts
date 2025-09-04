import { api } from "@/lib/axios";
import { API_RESPONSE } from "@/shared/types/response";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface BannerData {
  id: number;
  branchId: number;
  urlBanner: string;
  isActive: boolean;
  sortOrder: number;
}

// CREATE BANNER
export function UseCreateBanner() {
  return useMutation({
    mutationKey: ["banners"],
    mutationFn: async (data: Omit<BannerData, "id">) => {
      const req = await api.post("/banner", data);
      return req.data;
    },
  });
}

// GET BANNERS BY BRANCH ID
export function UseGetBannersByBranchId() {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<BannerData[]>>(`/banner`);
      return req.data;
    },
  });
}

// DELETE BANNER
export function UseDeleteBanner() {
  return useMutation({
    mutationKey: ["delete-banner"],
    mutationFn: async (id: number) => {
      const req = await api.delete(`/banner/${id}`);
      return req.data;
    },
  });
}
