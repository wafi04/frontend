import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormProfile } from "./form-profile";
import { Button } from "@/components/ui/button";

export function DialogFormProfile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Personal information</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Profile</DialogTitle>
          <DialogDescription>Form Profile</DialogDescription>
        </DialogHeader>
        <FormProfile />
      </DialogContent>
    </Dialog>
  );
}
