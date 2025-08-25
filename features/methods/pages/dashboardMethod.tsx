import { TableMethod } from "../components/table";
import { useGetAllMethod } from "../hooks/api";

export default function DashboardMethodPage() {
  const { data } = useGetAllMethod();
  return <>{data && <TableMethod data={data.data.data} />}</>;
}
