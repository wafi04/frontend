import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { toast } from "sonner";

export  function useAddStock(id : string){
    const {invalidateQueries,cancelQueries}  = useQueryClient()
    return useMutation({
        mutationKey : [`variants-${id}-stock`],
        mutationFn : async(stock : number) => {
            const req  =  await api.post(`/stock/${id}`,{
                quantity : stock
            })
            return req.data
        },
        onError : ()  => {
            cancelQueries({  queryKey : [`variants-${id}-stock`]})
            toast.error("Failed to add stock")
        },
        onSuccess : ()  => {
            invalidateQueries( { queryKey : [`variants-${id}-stock`]})
            toast.success("add stock success")
        }
    })
}


export function  useCheckAvaiblity(id : string){
    const {invalidateQueries,cancelQueries}  = useQueryClient()
    return useMutation({
        mutationKey : [`variants-${id}-stock`],
        mutationFn : async() => {
            const req  =  await api.post(`/stock/${id}`)
            return req.data
        },
        onError : ()  => {
            cancelQueries({  queryKey : [`variants-${id}-stock`]})
            toast.error("Failed to add stock")
        },
        onSuccess : ()  => {
            invalidateQueries( { queryKey : [`variants-${id}-stock`]})
            toast.success("add stock success")
        }
    })
}