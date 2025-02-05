"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormShipping } from "./formshipping";
import { ShippingReqType } from "@/schema/shipping";
import { ReactNode, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useDeleteShippingAddr } from "@/lib/api/user/user-shiipping";

export function DropdownShipping({
  data,
  id,
}: {
  data: ShippingReqType;
  id: string;
}) {
  const [formOpen, setFormOpen] = useState({
    onUpdate: false,
    onDelete: false,
  });

  const deletedata = useDeleteShippingAddr(id);

  const handle = (key: "onUpdate" | "onDelete", handle: boolean) => {
    setFormOpen((prevState) => ({
      ...prevState,
      [key]: handle,
    }));
  };

  const handleDelete = () => {
    console.log(`Deleting address with ID: ${id}`);
    deletedata.mutate();
    handle("onDelete", false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4">
            <Ellipsis className="h-4 w-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handle("onUpdate", true)}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handle("onDelete", true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {formOpen.onUpdate && (
        <Dialog
          open={formOpen.onUpdate}
          onOpenChange={(open) => handle("onUpdate", false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Shipping Address</DialogTitle>
              <DialogDescription>
                Make changes to your shipping address here.
              </DialogDescription>
            </DialogHeader>
            <FormShipping update={data} id={id} />
          </DialogContent>
        </Dialog>
      )}

      {formOpen.onDelete && (
        <Dialog
          open={formOpen.onDelete}
          onOpenChange={(open) => handle("onDelete", false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. The selected shipping address will
                be permanently deleted.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <Button onClick={handleDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export function DialogFormShipping({
  data,
  id,
  children,
}: {
  data?: ShippingReqType;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? children : <Button>Add Shipping Information</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {data ? "Update Shipping Address" : "Add Shipping Address"}
          </DialogTitle>
          <DialogDescription>
            {data
              ? "Make changes to your shipping address here."
              : "Add a new shipping address."}
          </DialogDescription>
        </DialogHeader>
        <FormShipping update={data} id={id} />
      </DialogContent>
    </Dialog>
  );
}
