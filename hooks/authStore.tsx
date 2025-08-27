// src/stores/authStore.ts
import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setIsLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: (user) => set({ user, isAuthenticated: true, isLoading: false }),

  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),

  setIsLoading: (loading) => set({ isLoading: loading }),
}));
