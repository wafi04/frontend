// src/providers/AuthInitProvider.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useAuthQuery } from "@/shared/hooks/useAuthQuery";
import { useAuthStore } from "@/shared/hooks/authStore";

export function AuthInitProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, error } = useAuthQuery();
  const setIsLoading = useAuthStore((s) => s.setIsLoading);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    setIsLoading(isLoading);

    if (user) {
      login(user); // ✅ Simpan user ke Zustand
    }

    if (error) {
      logout(); // ❌ Jika error (unauthorized), logout
    }
  }, [user, isLoading, error, login, logout, setIsLoading]);

  return <>{children}</>;
}
