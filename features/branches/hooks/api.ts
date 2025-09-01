// src/hooks/useRoles.ts
import { api } from "@/lib/axios";
import { BranchData } from "@/shared/types/branch";
import { API_RESPONSE, ApiPagination } from "@/shared/types/response";
import { Roles, UpsertRoles } from "@/shared/types/role";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// =========================
// GET ALL ROLES
// =========================
export function useGetBranches() {
  return useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      const res = await api.get<ApiPagination<BranchData[]>>("/branch");
      return res.data;
    },
    staleTime: 5 * 1000,
    gcTime: 5 * 1000,
  });
}

// =========================
// CREATE ROLE
// =========================
export function useCreateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpsertRoles) => {
      const res = await api.post("/roles", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

// =========================
// UPDATE ROLE
// =========================
export function useUpdateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: {
        domain: string;
      };
    }) => {
      const res = await api.patch(`/branch/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
}

// =========================
// DELETE ROLE
// =========================
export function useDeleteBrach() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await api.delete(`/branch/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
}
