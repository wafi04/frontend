import { TableCategory } from "@/features/category/components/table";
import { useFilterGetAllCategory } from "../hooks/useFilterCategory";
import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { PaginationComponents } from "@/components/layout/pagination";
import { Input } from "@/components/ui/input";
import { FilterDashboard } from "@/shared/components/filterheader/filter";
import { DialogCreate } from "../components/form";
import { useGetAllCategoryActive } from "../hooks/api";

export default function CategoryPage() {
  const {
    data,
    error,
    isLoading,
    setCurrentPage,
    searchTerm,
    currentLimit,
    setCurrentLimit,
    setSearchTerm,
  } = useFilterGetAllCategory();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="p-4 space-y-5">
      <HeaderDashboard title="Manajemen Kategori" >
        <div className="flex gap-4">
        <FilterDashboard
          currentLimit={currentLimit}
          searchTerm={searchTerm}
          setCurrentLimit={setCurrentLimit}
          setSearchTerm={setSearchTerm}
          />
        <DialogCreate />
          </div>
      </HeaderDashboard>
      {data?.data && <TableCategory data={data?.data.data} />}
      {data?.data.meta && (
        <PaginationComponents
          onPageChange={handlePageChange}
          pagination={data.data.meta}
        />
      )}
    </main>
  );
}
