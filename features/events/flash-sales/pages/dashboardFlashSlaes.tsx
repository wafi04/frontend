import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { UseGetAllFlashSales } from "../api/api";
import { TableFlashSales } from "../components/table";

export default function DashbordFlashSales() {
  const { data } = UseGetAllFlashSales();
  console.log(data);
  return (
    <main className="p-10">
      <HeaderDashboard />
      {data?.data && <TableFlashSales data={data.data} />}
    </main>
  );
}
