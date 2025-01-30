import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { ImageForm } from "./varianst-form/ImageVariants";
import { FormStock } from "./varianst-form/InventoryStep";
import { BasicInformationStep } from "./varianst-form/BasicInformation";
import { VariantsData } from "@/types/variants";
import { useDeleteVariants } from "@/lib/api/variants/variants";

export type FormDropdown = {
  openUpdate: boolean;
  openDelete: boolean;
  openInventory: boolean;
  openImage: boolean;
};

export function ButtonDialogVariants({
  variantId,
  data,
}: {
  variantId: string;
  data: VariantsData;
}) {
  const [formData, setFormData] = useState<FormDropdown>({
    openDelete: false,
    openImage: false,
    openInventory: false,
    openUpdate: false,
  });

  const handleOpen = (field: keyof FormDropdown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleClose = (field: keyof FormDropdown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const deletes = useDeleteVariants(variantId);

  const handleDelete = () => {
    deletes.mutate();
    handleClose("openDelete"); // Close dialog after deletion
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-4 right-4 rounded-full"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleOpen("openUpdate")}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpen("openDelete")}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpen("openInventory")}>
            Inventory
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpen("openImage")}>
            Images
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Image Dialog */}
      {formData.openImage && (
        <ImageForm variantID={variantId} open={formData.openImage} setOpen={() => handleClose("openImage")} />
      )}

      {/* Inventory Dialog */}
      {formData.openInventory && (
        <FormStock variantID={variantId} open={formData.openInventory} setOpen={() => handleClose("openInventory")} />
      )}

      {/* Update Dialog */}
      {formData.openUpdate && (
        <BasicInformationStep id={variantId} color={data.color} open={formData.openUpdate} setOpen={() => handleClose("openUpdate")} />
      )}

      <Dialog open={formData.openDelete} onOpenChange={() => handleClose("openDelete")}>
        <DialogContent className="p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Are you sure you want to delete this variant? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => handleClose("openDelete")} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-md">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
