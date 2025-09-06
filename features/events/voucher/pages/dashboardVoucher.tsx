import { Button } from "@/components/ui/button";
import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { useState } from "react";
import { DialogForm } from "../components/dialog";
import { useGetVouchers } from "../api/api";
import { TableVouchers } from "../components/table";

export default function DashboardVoucher() {
  const [open, setOpen] = useState(false);
  const { data } = useGetVouchers();

  return (
    <>
      <main className="p-6">
        <HeaderDashboard>
          <Button onClick={() => setOpen(true)}>Create</Button>
        </HeaderDashboard>
        {data?.data ? (
          <TableVouchers data={data?.data} />
        ) : (
          <div>Voucher Not Found</div>
        )}
      </main>
      {open && <DialogForm onOpen={() => setOpen(false)} open={open} />}
    </>
  );
}
