import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { TableProduct } from "../components/tableProduk";
import { useFilterGetAllProductWithProvider } from "../hooks/hooks";
import { PaginationComponents } from "@/components/layout/pagination";
import { FilterDashboard } from "@/shared/components/filterheader/filter";
import { Input } from "@/components/ui/input";

export default function DashboardProduct() {
  const {
    data,
    searchTerm,
    setSearchTerm,
    currentLimit,
    setCurrentLimit,
    setCurrentPage,
    isLoading,
    error,
  } = useFilterGetAllProductWithProvider();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="p-4 flex flex-col gap-4">
      <HeaderDashboard title="Manajemen Produk">
        {/* Search/Filter Section */}
        <FilterDashboard
          currentLimit={currentLimit}
          searchTerm={searchTerm}
          setCurrentLimit={setCurrentLimit}
          setSearchTerm={setSearchTerm}
        />
      </HeaderDashboard>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">Error: {error.message}</p>
        </div>
      )}

      {/* Data Table */}
      {data && !isLoading && (
        <>
          <TableProduct data={data.data} />
          <PaginationComponents
            pagination={data.meta}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Empty State */}
      {data && data.data.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          Tidak ada produk ditemukan
        </div>
      )}
    </main>
  );
}
