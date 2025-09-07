"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  useCreateFee,
  useDeleteFee,
  useGetFeesByReferenceId,
  useUpdateFee,
} from "./api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface TableFeesProps {
  referenceId: number;
}

export function TableFees({ referenceId }: TableFeesProps) {
  const { data, isLoading } = useGetFeesByReferenceId(referenceId);
  const createFee = useCreateFee();
  const updateFee = useUpdateFee();
  const deleteFee = useDeleteFee();

  const [editedFees, setEditedFees] = useState<Record<number, any>>({});

  // sync data dari server ke local state
  useEffect(() => {
    if (data?.data) {
      const mapped: Record<number, any> = {};
      data.data.forEach((fee: any) => {
        mapped[fee.id] = { ...fee }; // clone awal
      });
      setEditedFees(mapped);
    }
  }, [data]);

  if (isLoading) return <p className="p-4">Loading fees...</p>;

  const fees = data?.data || [];

  const handleChange = (id: number, field: string, value: any) => {
    setEditedFees((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = (id: number) => {
    const payload = editedFees[id];
    if (payload) {
      updateFee.mutate({ id, payload });
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between p-2">
        <h2 className="font-semibold">Fees for Reference {referenceId}</h2>
        <Button
          size="sm"
          onClick={() =>
            createFee.mutate({
              id: 0,
              referenceId,
              referenceName: `method:${referenceId}`,
              feeAmount: 0,
              feePercentage: 0,
              calculationType: "fixed",
              isActive: true, // gunakan camelCase konsisten
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
          }
        >
          + Add Fee
        </Button>
      </div>

      <Table className="border border-border rounded-md">
        <TableHeader>
          <TableRow className="border-b">
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Fee Amount</TableHead>
            <TableHead>Fee %</TableHead>
            <TableHead>Calculation Type</TableHead>
            <TableHead className="text-center">Active</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No fees found.
              </TableCell>
            </TableRow>
          ) : (
            fees.map((fee) => {
              const edited = editedFees[fee.id] || fee;
              return (
                <TableRow key={fee.id}>
                  <TableCell>{fee.id}</TableCell>
                  <TableCell>{fee.referenceName}</TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      value={edited.feeAmount ?? 0}
                      onChange={(e) =>
                        handleChange(fee.id, "feeAmount", Number(e.target.value))
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      value={edited.feePercentage ?? 0}
                      onChange={(e) =>
                        handleChange(fee.id, "feePercentage", Number(e.target.value))
                      }
                    />
                  </TableCell>

                  <TableCell>
  <Select
    value={edited.calculationType ?? "fixed"}
    onValueChange={(val) => handleChange(fee.id, "calculationType", val)}
  >
    <SelectTrigger className="h-8 w-full">
      <SelectValue placeholder="Select type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="fixed">Fixed</SelectItem>
      <SelectItem value="percentage">Percentage</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>

    </SelectContent>
  </Select>
</TableCell>

                  <TableCell className="text-center">
                    <Switch
                      checked={edited.isActive}
                      onCheckedChange={(checked) =>
                        handleChange(fee.id, "isActive", checked)
                      }
                    />
                  </TableCell>

                  <TableCell className="flex gap-1 justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSave(fee.id)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteFee.mutate(fee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
