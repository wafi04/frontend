import { api } from "@/lib/axios";
import { ApiPagination } from "@/shared/types/response";
import { UserData } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";

interface FilterOptions {
  limit: number;
  page: number;
  search: string;
}

export function useGetAllUser({ filter }: { filter?: FilterOptions }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users-all"],
    queryFn: async () => {
      const req = await api.get<ApiPagination<UserData[]>>("/user/all");
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
