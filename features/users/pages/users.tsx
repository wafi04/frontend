import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { useGetAllUser } from "../hooks/api";
import { TableUser } from "../components/table-user";

export default function UsersPage() {
  const { data } = useGetAllUser({});
  console.log(data);
  return (
    <main>
      <HeaderDashboard title="Manajemen Users" />
      {data &&
        data.data.data.map((item) => {
          return <TableUser key={item.id} userData={item} />;
        })}
    </main>
  );
}
