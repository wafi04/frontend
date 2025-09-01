import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { TableSubCategories } from "../components/table";
import { useGetAllSubCategory } from "../hooks/api";
import { FilterDashboard } from "@/shared/components/filterheader/filter";
import { useFilterGetAllCategory } from "@/features/category/hooks/useFilterCategory";
import { useFilterGetAllSubCategories } from "../hooks/useFilterGetAll";
import { PaginationComponents } from "@/components/layout/pagination";

export default function DashboardSubCategory() {
  const {
    data,
    searchTerm,
    currentLimit,
    setCurrentLimit,
    setCurrentPage,
    setSearchTerm,
  } = useFilterGetAllSubCategories();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <main className="py-4 px-6">
      <HeaderDashboard
        title="Manage Sub Categories"
        description="Manage Sub Category Information"
      >
        <FilterDashboard
          currentLimit={currentLimit}
          searchTerm={searchTerm}
          setCurrentLimit={setCurrentLimit}
          setSearchTerm={setSearchTerm}
        />
      </HeaderDashboard>
      {data?.data && <TableSubCategories data={data?.data.data} />}
      {data?.data.meta && (
        <PaginationComponents
          onPageChange={handlePageChange}
          pagination={data.data.meta}
        />
      )}
    </main>
  );
}
