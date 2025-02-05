import { useAuth } from "@/hooks/userAuthStore";
import { CartData, CartDto } from "@/types/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api";
import { API_RESPONSE } from "@/types/interfaces";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async (data: CartDto) => {
      const req = await api.post("/cart", data);
      return req.data;
    },
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData<API_RESPONSE<CartData>>([
        "cart",
      ]);

      queryClient.setQueryData<API_RESPONSE<CartData>>(["cart"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            items: [
              ...(old.data.cart_items || []),
              { ...newItem, id: "temp-" + Date.now() },
            ],
          },
        };
      });

      return { previousCart };
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
      toast.error("Failed Add To Cart");
    },
    onSuccess: (result) => {
      toast.success("Success Add To Cart");
    },
  });
}
export function useGetCart() {
  const { user } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<CartData>>("/cart");
      return req.data;
    },
    enabled: !!user?.user_id,
    staleTime: 1 * 60 * 1000, // 1 menit
    gcTime: 5 * 60 * 1000, // 5 menit
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data,
    error,
    isLoading,
  };
}
export function useRemoveCartItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async (cartItemsId: string) => {
      const req = await api.delete(`/cart/items/${cartItemsId}`);
      return req.data;
    },
    onMutate: async (cartItemsId) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<API_RESPONSE<CartData>>([
        "cart",
      ]);

      queryClient.setQueryData<API_RESPONSE<CartData>>(["cart"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            items: old.data.cart_items.filter(
              (item) => item.cart_item_id !== cartItemsId
            ),
          },
        };
      });

      return { previousCart };
    },
    onError: (err, cartItemsId, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
      toast.error("Failed to remove cart items");
    },
    onSuccess: () => {
      toast.success("Remove items from cart success");
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async () => {
      const req = await api.delete(`/cart/clear`);
      return req.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<API_RESPONSE<CartData>>([
        "cart",
      ]);

      queryClient.setQueryData<API_RESPONSE<CartData>>(["cart"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            items: [],
          },
        };
      });

      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
      toast.error("Failed to clear cart");
    },
    onSuccess: () => {
      toast.success("Cart cleared successfully");
    },
  });
}

export function useUpdateQuantity() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async (data: {
      cartItemId: string;
      quantity: number;
      size: string;
    }) => {
      const req = await api.patch(`/cart/items/${data.cartItemId}`, data);
      return req.data;
    },
    onError: () => {
      queryclient.cancelQueries({ queryKey: ["cart"] });
      toast.error("Failed to update quantity");
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
