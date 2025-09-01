import { FilterRequest } from "@/features/product/hooks/api";
import { api } from "@/lib/axios";
import { API_RESPONSE, ApiPagination } from "@/shared/types/response";
import { UserData } from "@/shared/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllUser({ filters }: { filters?: FilterRequest }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users-all", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("page", filters.page);
      if (filters?.search) params.append("search", filters.search);
      const req = await api.get<ApiPagination<UserData[]>>(
        `/user/all?${params.toString()}`
      );
      return req.data;
    },
    staleTime: 5 * 6000,
    gcTime: 5 * 6000,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useGetAllUsername({ username }: { username?: string }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users", username],
    queryFn: async () => {
      const req = await api.get<
        API_RESPONSE<{ id: number; username: string }[]>
      >(`/user/all/username?search=${username}`);
      return req.data;
    },
    staleTime: 5 * 6000,
    gcTime: 5 * 6000,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: {
        roleID: number;
        balance: number;
      };
    }) => {
      const res = await api.patch(`/user/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-all"] });
    },
  });
}

// =========================
// DELETE ROLE
// =========================
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await api.post(`/user/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-all"] });
    },
  });
}
