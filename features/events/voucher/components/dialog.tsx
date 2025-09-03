import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VoucherForm, VoucherFormData } from "./form/form";

interface DialogFormProps {
  open: boolean;
  onOpen: () => void;
  initialData?: VoucherFormData;
  Id?: number;
}

export function DialogForm({ open, onOpen, initialData, Id }: DialogFormProps) {
  return (
    <Dialog open={open} onOpenChange={() => onOpen()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Voucher</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new voucher. Make sure to set the
            correct dates and discount values.
          </DialogDescription>
        </DialogHeader>
        <VoucherForm initialData={initialData} Id={Id} />
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import { useDeleteVoucher } from "../api/api";
import { toast } from "sonner";

interface DialogDeleteProps {
  open: boolean;
  onOpen: () => void;
  Id?: number;
}

export function DialogDelete({ open, onOpen, Id }: DialogDeleteProps) {
  const { mutate } = useDeleteVoucher();
  const handleDelete = () => {
    mutate(Id as number);
    onOpen();
  };

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Voucher</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus voucher ini? Tindakan ini tidak
            dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onOpen}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
