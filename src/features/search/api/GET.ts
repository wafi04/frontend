import { BACKEND_URL } from "@/constants";
import { QuerySearch, SearchResponse } from "@/types/search";
export class ProductSearch {
  async getBySearch(params: QuerySearch): Promise<SearchResponse> {
    try {
      // Membuat query string dari parameter
      const queryParams = new URLSearchParams();

      // Menambahkan parameter ke query string jika ada nilainya
      if (params.search) queryParams.append("search", params.search);
      if (params.categoryId)
        queryParams.append("categoryId", params.categoryId);
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.offset) queryParams.append("offset", params.offset.toString());
      if (params.minPrice)
        queryParams.append("minPrice", params.minPrice.toString());
      if (params.maxPrice)
        queryParams.append("maxPrice", params.maxPrice.toString());
      if (params.color) queryParams.append("color", params.color);
      if (params.size) queryParams.append("size", params.size);

      // Membuat URL lengkap dengan query parameters
      const url = `${BACKEND_URL}/products/search?${queryParams.toString()}`;

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

      const data: SearchResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
}
