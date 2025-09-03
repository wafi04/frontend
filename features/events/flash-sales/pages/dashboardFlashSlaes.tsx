import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { UseGetAllFlashSales } from "../api/api";
import { TableFlashSales } from "../components/table";
import { Button } from "@/components/ui/button";
import { DialogForm } from "../dialog/dialog";
import { useState } from "react";

export default function DashbordFlashSales() {
  const { data } = UseGetAllFlashSales();
  const [open, setOpen] = useState(false);

  return (
    <main className="p-10">
      <HeaderDashboard>
        <Button onClick={() => setOpen(true)}>Create</Button>
      </HeaderDashboard>
      {data?.data && <TableFlashSales data={data.data} />}
      {open && <DialogForm onOpen={() => setOpen(false)} open={open} />}
    </main>
  );
}
