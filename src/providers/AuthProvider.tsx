"use client";

import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/userAuthStore";
import { API_RESPONSE } from "@/types/interfaces";
import { AuthResponse, UserData } from "@/types/user";
import { api } from "@/lib/api/api";
import { AxiosError } from "axios";

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { login, setLoading, logout } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await api.get<API_RESPONSE<AuthResponse>>(
          "/user/profile"
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          // Handle 401 Unauthorized (invalid or expired token)
          if (error.response?.status === 401) {
            logout(); // Clear user state
            router.push("/auth/login"); // Redirect to login page
          }
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: true,
  });

  useEffect(() => {
    setLoading(isLoading);

    // If data is available and valid, log the user in
    if (data?.data) {
      login(data.data.user);
    }
  }, [data, isLoading, login, setLoading]);

  // Handle query errors (e.g., invalid or expired token)
  useEffect(() => {
    if (error) {
      console.error("Authentication error:", error);
      logout(); // Clear user state
      router.push("/auth/login"); // Redirect to login page
    }
  }, [error, logout, router]);

  return <>{children}</>;
}
