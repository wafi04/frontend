import { api } from "@/lib/axios";
import { ApiPagination } from "@/types/response";
import { SubCategory } from "@/types/subcategory";
import { useQuery } from "@tanstack/react-query";

export function useGetAllSubCategory(){
    const {data,isLoading,error}  = useQuery({
        queryKey : ["all-subcategory"],
        queryFn : async ()  => {
            const data = await  api.get<ApiPagination<SubCategory[]>>("/subcategory")
            return data.data
        },
        staleTime : 60000,
        gcTime : 60000
    })

    return {
        data : data?.data.data || [],
        meta : data?.data.meta,
        isLoading,
        error
    }

}