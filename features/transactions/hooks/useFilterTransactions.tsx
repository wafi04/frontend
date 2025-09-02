import { useDebounce } from "@/shared/hooks/use-debounce";
import { useState, useEffect } from "react";
import { useGetAllTransactions } from "./api";

export const useFilterGetGetAllTransactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedLimit = useDebounce(currentLimit, 300);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, debouncedLimit]);

  const { data, isLoading, error } = useGetAllTransactions({
    limit: debouncedLimit.toString(),
    page: currentPage.toString(),
    search: debouncedSearchTerm,
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
};
