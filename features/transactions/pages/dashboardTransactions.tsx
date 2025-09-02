import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard"
import { useFilterGetGetAllTransactions } from "../hooks/useFilterTransactions"
import { FilterDashboard } from "@/shared/components/filterheader/filter"
import { TableTransactions } from "../components/table"
import { PaginationComponents } from "@/components/layout/pagination"

export default function DashboardTransactions(){
    const {data,currentLimit,setCurrentPage,searchTerm,setCurrentLimit,setSearchTerm} = useFilterGetGetAllTransactions()
const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };    return (
    <main className="py-4 px-6">
            <HeaderDashboard title="Manajemen Transaksi">
                <FilterDashboard currentLimit={currentLimit} searchTerm={searchTerm} setCurrentLimit={setCurrentLimit} setSearchTerm={setSearchTerm}/>
            </HeaderDashboard>
            {
                data?.data && <TableTransactions data={data.data.data}/>
            }
            {
                data?.data && <PaginationComponents onPageChange={handlePageChange} pagination={data?.data.meta}/>
            }
        </main>
    )
}