import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { useGetAllUser } from "../hooks/api";
import { TableUser } from "../components/table-user";
import { useFilterGetAllUsers } from "../hooks/useFilterUser";
import { FilterDashboard } from "@/shared/components/filterheader/filter";
import { PaginationComponents } from "@/components/layout/pagination";

export default function UsersPage() {
  const {
    data,
    currentLimit,
    setCurrentPage,
    searchTerm,
    setCurrentLimit,
    setSearchTerm,
  } = useFilterGetAllUsers();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <main className="p-6">
      <HeaderDashboard title="Manajemen Users">
        <FilterDashboard
          currentLimit={currentLimit}
          searchTerm={searchTerm}
          setCurrentLimit={setCurrentLimit}
          setSearchTerm={setSearchTerm}
        />
      </HeaderDashboard>
      {data?.data.data && <TableUser userData={data?.data.data} />}
      {data?.data.meta && (
        <PaginationComponents
          onPageChange={handlePageChange}
          pagination={data.data.meta}
        />
      )}
    </main>
  );
}
