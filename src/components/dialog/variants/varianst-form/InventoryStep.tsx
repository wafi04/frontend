"use client";
import { useAddStock } from "@/lib/api/variants/variantstock";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";

export function FormStock({
  variantID,
  open,
  setOpen,
}: {
  variantID: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState<{ stock: string; size: string }[]>([
    { stock: "0", size: "" },
  ]);
  const { mutate: addStock, isPending } = useAddStock(variantID);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "stock" | "size"
  ) => {
    const newFormData = [...formData];
    newFormData[index][field] = e.target.value.replace(/[^0-9]/g, "");
    setFormData(newFormData);
  };

  const handleAddMoreInventory = () => {
    setFormData((prev) => [...prev, { stock: "0", size: "" }]);
  };
  const handleDeleteInventory = (size: string) => {
    setFormData((prev) => prev.filter((data) => data.size !== size));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format the request data
    const formattedRequest = formData.map((data) => ({
      ...data,
      stock: parseInt(data.stock, 10),
    }));

    addStock(formattedRequest);

    console.log(formattedRequest);

    // Reset the form data
    setFormData([{ stock: "0", size: "" }]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Add Stock</DialogTitle>
          <DialogDescription>Added stock</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          {formData.map((entry, index) => (
            <div key={index} className="flex gap-4 w-full">
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="stock"
                value={entry.stock}
                onChange={(e) => handleInputChange(e, index, "stock")}
                className="w-full"
                min="0"
              />
              <Input
                type="text"
                value={entry.size}
                onChange={(e) => handleInputChange(e, index, "size")}
                placeholder="Size"
                className="w-full"
              />
              <Button
                className=""
                onClick={() => handleDeleteInventory(entry.size)}>
                <Trash />
              </Button>
            </div>
          ))}
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={handleAddMoreInventory}
              className="mt-2">
              Add More Stock
            </Button>
            <Button type="submit" disabled={isPending} className="mt-2">
              Update Stock
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
