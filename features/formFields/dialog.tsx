import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormFieldForm } from "./form";

export function DialogFields({
    open,
    onOpen
} : {
    open : boolean,
    onOpen : ()  => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form Field</DialogTitle>
          <DialogDescription>Create Form Field</DialogDescription>
        </DialogHeader>
        <FormFieldForm />
      </DialogContent>
    </Dialog>
  );
}
