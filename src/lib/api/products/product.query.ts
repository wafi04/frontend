import { ProductData, ProductDetails, ProductResponse } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { API_RESPONSE } from "@/types/interfaces";
import { ProductForm } from "@/schema";
import { api } from "../api";

export function UseCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["product"],
    mutationFn: async (create: ProductForm) => {
      const req = await api.post("/create-product", create);
      return req.data;
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
      queryClient.cancelQueries({ queryKey: ["product"] });
    },
    onSuccess: () => {
      toast.success("Product Create Success");
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}
export function useGetAllProduct() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<ProductResponse>>("/product");
      return req.data;
    },
    staleTime: 5 * 10 * 60,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data.products || [],
    isLoading,
    error,
  };
}
export function useGetProductById(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<ProductData>>(`/product/${id}`);
      return req.data;
    },
    staleTime: 1 * 24 * 60 * 60 * 1000,
    gcTime: 2 * 24 * 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data,
    isLoading,
    error,
  };
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["product"],
    mutationFn: async (data: ProductForm) => {
      console.log(data);
      const req = await api.put(`/product/${data.id}`, data);
      return req.data;
    },
    onMutate: async (updatedProduct) => {
      await queryClient.cancelQueries({ queryKey: ["product"] });
      const previousProducts = queryClient.getQueryData(["product"]);
      queryClient.setQueryData(["product"], (oldData: any) => {
        if (Array.isArray(oldData?.data)) {
          return {
            ...oldData,
            data: oldData.data.map((product: ProductForm) =>
              product.id === updatedProduct.id
                ? { ...product, ...updatedProduct }
                : product
            ),
          };
        }
        return oldData;
      });

      queryClient.setQueryData(
        ["product", updatedProduct.id],
        (oldData: any) => ({
          ...oldData,
          ...updatedProduct,
        })
      );

      return { previousProducts };
    },
    onError: (error: AxiosError, context: any) => {
      toast.error(error.message);
      queryClient.setQueryData(["product"], context?.previousProducts);
    },
    onSuccess: (serverResponse, updatedProduct) => {
      toast.success("Product Update Success");

      // Ensure we update with the server's response
      queryClient.setQueryData(["product"], (oldData: any) => {
        if (Array.isArray(oldData?.data)) {
          return {
            ...oldData,
            data: oldData.data.map((product: ProductForm) =>
              product.id === updatedProduct.id ? serverResponse : product
            ),
          };
        }
        return oldData;
      });

      queryClient.invalidateQueries({
        queryKey: ["product"],
        exact: false,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteProduct(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["product"],
    mutationFn: async (id: string) => {
      const req = await api.delete(`/product/${id}`);
      return req.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["product"] });
      const previousProducts = queryClient.getQueryData(["product"]);
      queryClient.setQueryData(["product"], (oldData: any) => {
        if (Array.isArray(oldData?.data)) {
          return {
            ...oldData,
            data: oldData.data.filter(
              (product: ProductForm) => product.id !== id
            ),
          };
        }
        return oldData;
      });

      return { previousProducts };
    },
    onError: (error: AxiosError, context: any) => {
      // jika delete gagal maka datanya dikembalikan
      toast.error(error.message);
      queryClient.setQueryData(["product"], context?.previousProducts);
    },
    onSuccess: () => {
      // Show success toast
      toast.success("Product Deleted Successfully");

      // Invalidate product queries to mendpaatrkan  data  terbaru
      queryClient.invalidateQueries({
        queryKey: ["product"],
        exact: false,
        refetchType: "active",
      });
    },
    onSettled: () => {
      // Always refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}
