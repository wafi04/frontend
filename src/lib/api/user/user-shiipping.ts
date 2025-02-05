import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { ShippingReqType, ShippingUpdateReqType } from "@/schema/shipping";
import { toast } from "sonner";
import { API_RESPONSE } from "@/types/interfaces";
import { ShippingResponse } from "@/types/user";
import { ReqUpdateUserDetails } from "@/schema/profiles";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";

export function useCreateShippingAddr() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["shipping-address"],
    mutationFn: async (data: ShippingReqType) => {
      const req = await api.post("/user/address", data);
      return req;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["shipping-address"] });
      toast.success("succces to add shipping address");
    },
    onError: () => {
      queryclient.cancelQueries({ queryKey: ["shipping-address"] });
      toast.error("Something went wrong");
    },
  });
}

export function useGetShippingAddr() {
  const { data, error, isLoading } = useQuery<API_RESPONSE<ShippingResponse>>({
    queryKey: ["shipping-address", "all"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<ShippingResponse>>(
        "/user/address"
      );
      return req.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return {
    data: data?.data.address,
    error,
    isLoading,
  };
}

export function useUpdateShippingAddr(id?: string) {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["shipping-address"],
    mutationFn: async (data: ShippingUpdateReqType) => {
      const req = await api.patch(`/user/address/${id}`, data);
      return req.data;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["shipping-address"] });
      toast.success("succces to update shipping address");
    },
    onError: () => {
      queryclient.cancelQueries({ queryKey: ["shipping-address"] });
      toast.error("Something went wrong");
    },
  });
}

export function useDeleteShippingAddr(id: string) {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["shipping-address"],
    mutationFn: async () => {
      const req = await api.delete(`/user/address/${id}`);
      return req.data;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["shipping-address"] });
      toast.success("succces to delete shipping address");
    },
    onError: () => {
      queryclient.cancelQueries({ queryKey: ["shipping-address"] });
      toast.error("Something went wrong");
    },
  });
}
