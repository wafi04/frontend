import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard"
import { useGetProductWithProvider } from "../hooks/api"
import { TableProduct } from "../components/tableProduk"

export default function DashboardProduct(){
    const {data}  = useGetProductWithProvider()
    console.log(data)
    return (
        <main className="p-4 flex flex-col gap-4">
            <HeaderDashboard title="Produk"/>
            {
                data &&
            <TableProduct data={data}/>
            }
        </main>
    )
}