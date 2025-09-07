"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Roles } from "@/shared/types/role";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDeleteRole, useUpdateRole } from "../hooks/api";

export function TableRoles({ roles }: { roles: Roles[] }) {
  const [data, setData] = useState<Roles[]>(roles);
  const [changedRows, setChangedRows] = useState<Set<number>>(new Set());

  // hooks
  const { mutate: updateRole, isPending: updating } = useUpdateRole();
  const { mutate: deleteRole, isPending: deleting } = useDeleteRole();

  // update field in local state
  const updateField = (id: number, field: keyof Roles, value: any) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    setChangedRows((prev) => new Set(prev).add(id)); // tandai row berubah
  };

  // save to API
  const handleSaveRole = (role: Roles) => {
    updateRole(
      {
        id: role.id,
        data: {
          name: role.name,
          description: role.description,
          profitPercentage: role.profitPercentage,
          profit : role.profit,
          profitType : role.profitType,
          isActive: role.isActive,
        },
      },
      {
        onSuccess: () => {
          setChangedRows((prev) => {
            const newSet = new Set(prev);
            newSet.delete(role.id);
            return newSet;
          });
        },
      }
    );
  };

  // delete from API
  const handleDeleteRole = (id: number) => {
    deleteRole(id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="border border-gray-700">Id</TableHead>
          <TableHead className="border border-gray-700">Name</TableHead>
          <TableHead className="border border-gray-700">Description</TableHead>
          <TableHead className="border border-gray-700">
            Profit Fixed
          </TableHead>
          <TableHead className="border border-gray-700">Profit Percentage</TableHead>
                    <TableHead className="border border-gray-700">Profit Type</TableHead>

          <TableHead className="border border-gray-700">Active</TableHead>
          <TableHead className="border border-gray-700">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((role) => (
          <TableRow key={role.id}>
            {/* ID */}
            <TableCell className="border border-gray-800">{role.id}</TableCell>

            {/* Name */}
            <TableCell className="border border-gray-800">
              <Input
                value={role.name}
                onChange={(e) => updateField(role.id, "name", e.target.value)}
              />
            </TableCell>

            {/* Description */}
            <TableCell className="border border-gray-800">
              <Input
                value={role.description ?? ""}
                onChange={(e) =>
                  updateField(role.id, "description", e.target.value)
                }
              />
            </TableCell>
             <TableCell className="border border-gray-800">
              <Input
                type="number"
                value={role.profit ?? ""}
                onChange={(e) =>
                  updateField(role.id, "profit", Number(e.target.value))
                }
              />
            </TableCell>

            {/* Margin Profit */}
            <TableCell className="border border-gray-800">
              <Input
                type="number"
                value={role.profitPercentage ?? ""}
                onChange={(e) =>
                  updateField(role.id, "profitPercentage", Number(e.target.value))
                }
              />
            </TableCell>

            {/* Margin Profit Type */}
            <TableCell className="border border-gray-800">
              <Select
                value={role.profitType ?? ""}
                onValueChange={(val) =>
                  updateField(role.id, "profitType", val)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>   
                  <SelectItem value="hybrid">hybrid</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            {/* Active */}
            <TableCell className="border border-gray-800">
              <Switch
                checked={role.isActive}
                onCheckedChange={(checked) =>
                  updateField(role.id, "isActive", checked)
                }
              />
            </TableCell>

            {/* Actions */}
            <TableCell className="border border-gray-800 space-x-2 flex items-center">
              <Button
                size="sm"
                onClick={() => handleSaveRole(role)}
                disabled={updating}
                className="relative"
              >
                Save
                {changedRows.has(role.id) && (
                  <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-red-500" />
                )}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDeleteRole(role.id)}
                disabled={deleting}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
