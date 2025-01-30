"use client";
import { API_RESPONSE } from "@/types/interfaces";
import { SessionData, SessionsResponse } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api";

export function useGetListSessions() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await api.get<API_RESPONSE<SessionsResponse>>(
        `/auth/list-sessions`
      );
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: true,
  });

  return {
    data: data?.data.sessions || [],
    isLoading,
    error,
  };
}

export function useRevokeSessions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["sessions"],
    mutationFn: async (id: string) => {
      const data = await api.delete(`/auth/revoke-session/${id}`);
      return data.data;
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["sessions"] });

      const previousSessions = queryClient.getQueryData([
        "sessions",
      ]) as API_RESPONSE<SessionsResponse>;

      queryClient.setQueryData(
        ["sessions"],
        (old: API_RESPONSE<SessionsResponse> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              sessions: old.data.sessions.filter(
                (session) => session.session_id !== id
              ),
            },
          };
        }
      );

      // Return a context object with the snapshotted value
      return { previousSessions };
    },
    // Rollback if mutation fails
    onError: (
      err,
      id,
      context: { previousSessions: API_RESPONSE<SessionsResponse> } | undefined
    ) => {
      if (context?.previousSessions) {
        queryClient.setQueryData(["sessions"], context.previousSessions);
      }
      toast.error("Error Deleting Session");
    },
    // Ensure data is up to date after successful mutation
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("Session Deleted Successfully");
    },
  });
}
