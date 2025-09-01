import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormBranch from "../hooks/form";
import { Branch } from "@/shared/types/branch";
import { User } from "@/shared/types/user";

interface DialogBranchesProps {
  open: boolean;
  initialData?: Branch | null;
  onOpenChange?: (open: boolean) => void;
  isLoading?: boolean;
  users?: User[];
}

export function DialogBranches({
  open,
  initialData,
  isLoading,
  onOpenChange,
  users,
}: DialogBranchesProps) {
  const isEdit = !!initialData;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Branch" : "Create New Branch"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the branch information below."
              : "Fill in the details to create a new branch."}
          </DialogDescription>
        </DialogHeader>
        <FormBranch />
      </DialogContent>
    </Dialog>
  );
}
