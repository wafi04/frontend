import { COLORS } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { VariantsData } from "@/types/variants";
import { useState } from "react";
import { useCreateVariants, useUpdateVariants } from "@/lib/api/variants/variants";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface PropsBasicVariants {
  product_id?  : string 
  id?  : string 
  color? : string 
  open : boolean
  setOpen : (open : boolean)  => void
}

export function BasicInformationStep({ color,id,product_id,open,setOpen }: PropsBasicVariants) {
  const [colors, setColor] = useState(color|| "");
  const updates = useUpdateVariants(id as string);
  const create = useCreateVariants();

  const handleSubmit = () => {
    if (id) {
      updates.mutate({ color :colors , id: id });
    } else {
      create.mutate({ color : colors, productId: product_id as string });
    }
  };

  return (
    <Dialog open={open}  onOpenChange={setOpen}>
      <DialogContent className="p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Add Variant</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Choose a color for the new variant.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Color</Label>
          <Select onValueChange={setColor} value={colors}>
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              {COLORS.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Save Variant
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
