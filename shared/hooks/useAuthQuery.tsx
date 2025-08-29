// src/hooks/useAuthQuery.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@/lib/axios";
import { useAuthStore } from "./authStore";
import { API_RESPONSE } from "@/shared/types/response";
import { User } from "@/shared/types/user";

const fetchUser = async () => {
  const response = await api.get<API_RESPONSE<User>>("/user/profile");
  return response.data.data;
};

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: fetchUser,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 menit
  });
};
