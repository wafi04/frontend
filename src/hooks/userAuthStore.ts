import { create } from "zustand";
import { UserData } from "@/types/user";
import { api } from "@/lib/api/api";

interface AuthState {
  user: UserData | null;
  isLoading: boolean;
  error: Error | null;
  isAdmin: boolean;

  login: (userData: UserData) => void;
  logout: () => Promise<void>;
  // refreshToken: () => Promise<boolean>;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAdmin: false,

  login: (userData) => {
    set({
      user: userData,
      isAdmin: userData.role === "admin",
      error: null,
    });
  },

  logout: async () => {
    try {
      await api.post("/logout")
      
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({
        user: null,
        isAdmin: false,
        error: null,
      });
    }
  },

  // refreshToken: async () => {
  //   set({ isLoading: true });
  //   try {
  //     const token = localStorage.getItem("token");
  //     // const refreshResponse = await fetch(`${BASE_URL}/auth/refresh-token`, {
  //     //   method: "POST",
  //     //   credentials: "include",
  //     // });

  //     // if (!refreshResponse.ok) {
  //     //   throw new Error("Failed to refresh token");
  //     // }

  //     const profileResponse = await fetch(`${BASE_URL}/auth/profile`, {
  //       method: "GET",
  //       credentials: "include",
  //     });

  //     if (!profileResponse.ok) {
  //       throw new Error("Failed to fetch profile");
  //     }

  //     const userData = await profileResponse.json();
  //     set({
  //       user: userData.data,
  //       isAdmin: userData.data.role === "admin",
  //       isLoading: false,
  //     });

  //     return true;
  //   } catch (error) {
  //     set({
  //       user: null,
  //       isAdmin: false,
  //       error: error instanceof Error ? error : new Error("Refresh failed"),
  //       isLoading: false,
  //     });
  //     return false;
  //   }
  // },

  setLoading: (isLoading) => {
    set({ isLoading });
  },
}));

export const useAuth = () => {
  const { user, isLoading, error, isAdmin, logout} =
    useAuthStore();

  return {
    user,
    isLoading,
    error,
    isAdmin,
    logout,
  };
};
