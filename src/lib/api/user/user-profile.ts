import {
  ReqCreateUserDetails,
  ReqCreateUserDetailsSchema,
  ReqUpdateUserDetails,
} from "@/schema/profiles";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../api";
import { toast } from "sonner";
import { API_RESPONSE } from "@/types/interfaces";
import { UserProfile } from "@/types/user";

export function useCreateProfileDetails() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["user-profiles"],
    mutationFn: async (data: ReqCreateUserDetails) => {
      const req = await api.post("/user/details", data);
      return req.data;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["user-profiles"] });
      toast.success("Added profiles user");
    },
    onError: () => {
      queryclient.cancelQueries({ queryKey: ["user-profiles"] });
      toast.error("Something Went Wrong");
    },
  });
}

export function useGetProfiles() {
  const queryclient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["user-profiles"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<UserProfile>>(`/user/details`);
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
    data: data?.data,
    error,
    isLoading,
  };
}

export function useUpdateProfile(id: string) {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["user-profiles"],
    mutationFn: async (data: ReqUpdateUserDetails) => {
      const req = await api.patch(`/user/details/${id}`, data);
      return req.data;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["user-profiles"] });
      toast.success("Update profiles user");
    },
    onError: () => {
      queryclient.cancelQueries({ queryKey: ["user-profiles"] });
      toast.error("Something Went Wrong");
    },
  });
}
