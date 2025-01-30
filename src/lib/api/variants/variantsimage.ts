import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { toast } from "sonner";

export function useAddImage(){
   const queryclient =   useQueryClient()
   return useMutation({
    mutationKey : ['variant-image'],
    mutationFn :async (formdata : FormData)  => {
        const id  =  formdata.get("variant_id")
        const req =   await api.post(`/product/${id}/variant/images`,formdata,{isMultipart : true})
        return req.data
    },
    onError : ()  => {
        queryclient.cancelQueries({queryKey : "variant-image"})
        toast.error("Something went wrong")
    },
    onSuccess : ()  => {
        queryclient.invalidateQueries({queryKey : "variant-image"})
        toast.success("add image success")
    }
   })
}



export function useDeleteImage(){
    const queryclient = useQueryClient()
    return useMutation({
        mutationKey :  ["variant-image"],
        mutationFn : async(id : string) => {
            const req = await api.delete(`/product/${id}/variant/images`)
            return req.data
        },
        onError : ()  => {
            queryclient.cancelQueries({queryKey : "variant-image"})
            toast.error("Something went wrong")
        },
        onSuccess : ()  => {
            queryclient.invalidateQueries({queryKey : "variant-image"})
            toast.success("Delete image success")
        }
    })
}