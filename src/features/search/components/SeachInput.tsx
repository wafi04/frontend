"use client";
import { useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchHooks } from "@/hooks/search/Search";
import { useGetAllProductsBySearch } from "../api/main";
import { OpenSearch } from "./OpenSearch";

export default function SearchInput() {
  const {
    debouncedSearch,
    handleKeyDown,
    inputRef,
    openSearch,
    searchRef,
    setDebouncedSearch,
    setOpenSearch,
    toggleSearch,
  } = useSearchHooks();

  const { data, isFetching } = useGetAllProductsBySearch({
    search: debouncedSearch,
    limit: 6,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpenSearch(false);
        setDebouncedSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef, setDebouncedSearch, setOpenSearch]);

  useEffect(() => {
    if (openSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openSearch]);

  return (
    <div ref={searchRef} className="relative">
      {!openSearch && (
        <div
          className="relative max-w-sm cursor-pointer group"
          onClick={toggleSearch}>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-transform duration-200 group-hover:scale-110">
            <Search className="size-6 text-gray-200 group-hover:text-black " />
          </div>
          <Input
            readOnly
            placeholder="Search"
            className="w-full  bg-gray-100 cursor-pointer pl-12 
                     rounded-full border-transparent
                     transition-all duration-200 ease-in-out
                     hover:bg-gray-200 focus:bg-white
                     focus:outline-none focus:ring-2 focus:ring-gray-200
                     placeholder:text-gray-500 placeholder:font-light"
          />
        </div>
      )}
      {openSearch && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <OpenSearch
            isLoading={isFetching}
            data={data}
            inputRef={inputRef}
            handleKeyDown={handleKeyDown}
            setSearch={setDebouncedSearch}
            toogleSearch={toggleSearch}
            search={debouncedSearch}
          />
        </div>
      )}
    </div>
  );
}
