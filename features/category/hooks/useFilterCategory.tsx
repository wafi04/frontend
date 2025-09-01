import { useDebounce } from "@/shared/hooks/use-debounce";
import { useEffect, useState } from "react";
import { useGetAllCategory } from "./api";

export function useFilterGetAllCategory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedLimit = useDebounce(currentLimit, 300);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, debouncedLimit]);

  const { data, isLoading, error } = useGetAllCategory({
    filters: {
      limit: debouncedLimit.toString(),
      page: currentPage.toString(),
      search: debouncedSearchTerm,
    },
  });

  return {
    data,
    searchTerm,
    setSearchTerm,
    currentLimit,
    setCurrentLimit,
    currentPage,
    setCurrentPage,
    isLoading,
    error,
    debouncedSearchTerm,
    debouncedLimit,
  };
}
