"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WithChildren } from "../types/interfaces";

export function ReactQueryProvider({ children }: WithChildren) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
