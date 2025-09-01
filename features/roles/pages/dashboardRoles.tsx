import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { useGetRoles } from "../hooks/api";
import { TableRoles } from "../components/table";

export default function DashboardRoles() {
  const { data } = useGetRoles();
  console.log(data?.data);
  return (
    <main>
      <HeaderDashboard
        title="Manajemen Roles"
        description="Manajemen role user"
      />
      <section className="p-6">
        {data?.data && <TableRoles roles={data?.data ?? []} />}
      </section>
    </main>
  );
}
