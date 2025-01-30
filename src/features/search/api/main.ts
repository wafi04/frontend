import { useInfiniteQuery } from "@tanstack/react-query";
import { QuerySearch } from "@/types/search";
import { BASE_URL } from "@/constants";
import { API_RESPONSE } from "@/types/interfaces";

export function useGetAllProductsBySearch(params: QuerySearch) {
  const {
    data,
    isLoading,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<API_RESPONSE<any>, Error>({
    queryKey: ["products", "search", params],
    queryFn: async ({ pageParam = null }) => {
      const queryParams = new URLSearchParams();

      if (pageParam) {
        queryParams.append("cursor", pageParam as string);
      }

      // Add search term
      if (params.search) {
        queryParams.append("search", params.search);
      }

      // Add other filters with type checking
      if (params.limit && !isNaN(params.limit)) {
        queryParams.append("limit", params.limit.toString());
      }
      if (params.minPrice && !isNaN(params.minPrice as number)) {
        queryParams.append("minPrice", params.minPrice.toString());
      }
      if (params.maxPrice && !isNaN(params.maxPrice as number)) {
        queryParams.append("maxPrice", params.maxPrice.toString());
      }
      if (params.color) {
        queryParams.append("color", params.color);
      }
      const url = `${BASE_URL}/products/search?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Received data:", responseData);
      return responseData;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.data.metadata.nextCursor,
    enabled: !!params.search,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  // Flatten the pages data for easier consumption
  const allProducts = data?.pages.flatMap((page) => page?.data.products) ?? [];

  return {
    data: allProducts,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
