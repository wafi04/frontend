import { api } from "@/lib/axios";
import { ProductWithProvider } from "@/types/productWithProvider";
import { API_RESPONSE } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

export function useGetProductWithProvider(){
    const { data, isLoading, error } = useQuery({
            queryKey: ["product-with-provider"],
            queryFn: async () => {
                const req = await api.get<API_RESPONSE<ProductWithProvider[]>>("/productwithprovider")
                return req.data
            },
            staleTime: 3 * 60 * 1000,
            gcTime: 5 * 60 * 1000,    
    })

    return {
        data : data?.data,
        isLoading,
        error
    }
}