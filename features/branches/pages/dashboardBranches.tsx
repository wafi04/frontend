import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { useDeleteBrach, useGetBranches, useUpdateBranch } from "../hooks/api";
import TableBranches from "../components/table";

export default function DashboardBranches() {
  const { data } = useGetBranches();
  const { mutate } = useUpdateBranch();
  const { mutate: deleteBranch } = useDeleteBrach();
  const handleUpdate = (branchId: number, domain: string) => {
    mutate({
      data: {
        domain,
      },
      id: branchId,
    });
  };
  const handleDelete = (branchId: number) => {
    deleteBranch(branchId);
  };
  return (
    <main>
      <HeaderDashboard title="Dashboard Branches" />
      {data && (
        <TableBranches
          branches={data.data.data}
          onDelete={handleDelete}
          onUpdateDomain={handleUpdate}
        />
      )}
    </main>
  );
}
