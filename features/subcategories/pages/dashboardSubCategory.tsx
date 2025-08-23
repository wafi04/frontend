import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { TableSubCategories } from "../components/table";
import { useGetAllSubCategory } from "../hooks/api";

export default function DashboardSubCategory() {
    const { data } = useGetAllSubCategory()
    console.table(data)
    return <main className="py-4 px-6">
        <HeaderDashboard
        
            title="Manage Sub Categories"
            description="Manage Sub Category Information"
        />

        <TableSubCategories data={data} />
    </main>
}