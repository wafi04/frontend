import { VerficationEmailResponse } from "@/types/auth";
import { API_RESPONSE } from "@/types/interfaces";
import { Api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const api = new Api();
export function useEmailVerfication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["verification-email"],
    mutationFn: async (code: string) => {
      const token = localStorage.getItem("token") ?? "";
      const req = await api.post<API_RESPONSE<VerficationEmailResponse>>(
        `/auth/verification-email`,
        {
          code: code,
          token: token,
        }
      );

      return req.data;
    },
    onError: () => {
      queryClient.cancelQueries({ queryKey: "user" });
      toast.error("Verfication Failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "user" });
      toast.success("Verification Success");
    },
  });
}
export function useResendVerificationEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["resend-email"],
    mutationFn: async () => {
      const token = localStorage.getItem("token") ?? "";
      const req = await api.post<API_RESPONSE<VerficationEmailResponse>>(
        `/auth/resend-verification?token=${token}`,
        {
          type: "EMAIL_VERIFICATION",
        }
      );

      return req.data;
    },
    onError: () => {
      queryClient.cancelQueries({ queryKey: "resend-email" });
      toast.error("Resend Failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "resend-email" });
      toast.success("Resend Success");
    },
  });
}
