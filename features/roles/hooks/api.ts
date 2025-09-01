// src/hooks/useRoles.ts
import { api } from "@/lib/axios";
import { API_RESPONSE } from "@/shared/types/response";
import { Roles, UpsertRoles } from "@/shared/types/role";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// =========================
// GET ALL ROLES
// =========================
export function useGetRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async (): Promise<API_RESPONSE<Roles[]>> => {
      const res = await api.get<API_RESPONSE<Roles[]>>("/roles");
      return res.data;
    },
    staleTime: 5 * 1000,
    gcTime: 5 * 1000,
  });
}

// =========================
// CREATE ROLE
// =========================
export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpsertRoles): Promise<API_RESPONSE<Roles>> => {
      const res = await api.post<API_RESPONSE<Roles>>("/roles", data);
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
export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpsertRoles;
    }): Promise<API_RESPONSE<Roles>> => {
      const res = await api.put<API_RESPONSE<Roles>>(`/roles/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

// =========================
// DELETE ROLE
// =========================
export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await api.delete(`/roles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
