import { api } from "@/lib/axios";
import { API_RESPONSE } from "@/shared/types/response";
import { UpsertWebSettings, WebSettings } from "@/shared/types/websettings";
import { useMutation, useQuery } from "@tanstack/react-query";

// CREATE BANNER
export function useCreateWebSettings() {
  return useMutation({
    mutationKey: ["web-settings"],
    mutationFn: async (data: UpsertWebSettings) => {
      const req = await api.post("/websettings", data);
      return req.data;
    },
  });
}

// GET BANNERS BY BRANCH ID
export function useGetWenSettings() {
  return useQuery({
    queryKey: ["web-settings"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<WebSettings>>(`/websettings`);
      return req.data;
    },
  });
}

// DELETE BANNER
export function UseUpdateWebSettings() {
  return useMutation({
    mutationKey: ["web-settigns"],
    mutationFn: async (id: number) => {
      const req = await api.delete(`/websettings/${id}`);
      return req.data;
    },
  });
}
