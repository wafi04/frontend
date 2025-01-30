import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { api } from "../api";
import { API_RESPONSE } from "@/types/interfaces";
import { ProductVariantsResponse } from "@/types/variants";

export function useCreateVariants() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["variants"],
    mutationFn: async (data : { productId : string,color : string}) => {
      const req =  await api.post(`/product/${data.productId}/variant`,{
        color : data.color
      })
      return req.data
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
      queryClient.cancelQueries({ queryKey: ["variants"] });
    },
    onSuccess: () => {
      toast.success("Variants Create Success");
      queryClient.invalidateQueries({ queryKey: ["variants"] });
    },
  });
}

export function useGetAllVariantsByProduct(id: string) {
  return useQuery({
    queryKey: ["variants", id],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<ProductVariantsResponse>>(`/product/${id}/variants`)
      return req.data
    },

    staleTime: 5 * 10 * 60,
    retry: false,
    refetchOnWindowFocus: false,
  });
}



export function useUpdateVariants(id : string){
  const {cancelQueries,invalidateQueries}  = useQueryClient()
  return useMutation({
    mutationKey : ["variants",id],
    mutationFn : async(data : { id : string,color : string})  => {
      const req = await api.put(`/product/${data.id}/variant`,data)
      return  req.data
    },
    onError : ()  => {  
      cancelQueries({  queryKey : ["variants"]})
      toast.error("failed update variants")
    },
    onSuccess : ()  => {
      invalidateQueries({ queryKey : ["variants"]})
      toast.success("varinats update successfully")
    }
  })
}


export function useDeleteVariants(id : string){
   const queryClient= useQueryClient()
  return useMutation({
    mutationKey : ["variants",id],
    mutationFn : async()  => {
      const req = await api.delete(`/product/${id}/variant`)
      return  req.data
    },
     onError: (error: AxiosError) => {
      toast.error(error.message);
      queryClient.cancelQueries({ queryKey: ["variants"] });
    },
    onSuccess: () => {
      toast.success("Variants Delete Success");
      queryClient.invalidateQueries({ queryKey: ["variants"] });
    },
  })
}
