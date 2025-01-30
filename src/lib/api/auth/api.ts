"use client";
import { InitialDataLogin, InitialDataRegister } from "@/schema/auth";
import { LoginResponse } from "@/types/auth";
import { API_RESPONSE, ErrorResponse } from "@/types/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "../api";

export function useHandleLogout() {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const response = await api.post(`/auth/logout?token=${token}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
      push("/auth/login");
      localStorage.removeItem("token");
      toast.success("Logout Succes");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred during logout.");
    },
  });
}
export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: InitialDataRegister) => {
      const res = await api.post("/auth/register");
      return res.data;
    },
    onError: (err: ErrorResponse) => {
      queryClient.cancelQueries({ queryKey: ["user"] });
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast("Register Success");
      push("/login");
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: InitialDataLogin) => {
      const res = await api.post<API_RESPONSE<LoginResponse>>(
        "/auth/login",
        data
      );
      return res.data;
    },
    onError: (error: ErrorResponse) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      queryClient.cancelQueries({ queryKey: ["user"] });
      toast.error(`Error: ${errorMessage}`);
    },
    onSuccess: (data: API_RESPONSE<LoginResponse>) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      const token = localStorage.setItem("token", data.data.access_token);
      const session = localStorage.setItem(
        "session",
        data.data.session_info.session_id
      );
      console.log(data);
      toast.success("Login Success");
      push("/");
    },
  });
};
