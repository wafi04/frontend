import { useState } from "react";
import { HeaderDashboard } from "../dashboard/components/headerDashboard";
import { DialogFields } from "./dialog";
import { Button } from "@/components/ui/button";
import { useGetFormFields } from "./api";
import { TableFormFields } from "./table";

export default function DashboardFormFields() {
  const [open, setOpen] = useState<boolean>(false);
  const {data}  = useGetFormFields()
  return (
    <>
      <main className="p-6">
        <HeaderDashboard>
          <Button onClick={() => setOpen(true)}>Open</Button>
        </HeaderDashboard>
        <TableFormFields data={data}/>
      </main>
      {open && <DialogFields onOpen={() => setOpen(!open)} open={open} />}
    </>
  );
}
