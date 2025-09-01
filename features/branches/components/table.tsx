"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BranchData } from "@/shared/types/branch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/format";
import { Input } from "@/components/ui/input";
import { Check, Trash2 } from "lucide-react";

interface TableBranchesProps {
  branches: BranchData[];
  onUpdateDomain?: (branchId: number, newDomain: string) => void;
  onToggleStatus?: (branchId: number) => void;
  onDelete?: (branchId: number) => void;
}

export default function TableBranches({
  branches,
  onUpdateDomain,
  onToggleStatus,
  onDelete,
}: TableBranchesProps) {
  const [editingDomains, setEditingDomains] = useState<Record<number, string>>(
    {}
  );

  const handleDomainChange = (branchId: number, value: string) => {
    setEditingDomains((prev) => ({
      ...prev,
      [branchId]: value,
    }));
  };

  const handleDomainBlur = (branchId: number) => {
    const newDomain = editingDomains[branchId];
    if (newDomain !== undefined && onUpdateDomain) {
      onUpdateDomain(branchId, newDomain);
    }
    // Remove from editing state
    setEditingDomains((prev) => {
      const newState = { ...prev };
      delete newState[branchId];
      return newState;
    });
  };

  const handleDomainKeyPress = (e: React.KeyboardEvent, branchId: number) => {
    if (e.key === "Enter") {
      handleDomainBlur(branchId);
    }
  };

  const getDomainValue = (branch: BranchData) => {
    return editingDomains[branch.id] !== undefined
      ? editingDomains[branch.id]
      : branch.domain;
  };

  return (
    <div className="p-6 shadow-sm overflow-hidden rounded-lg">
      <Table className="border border-gray-800">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center border border-gray-800">
              ID
            </TableHead>
            <TableHead className="border border-gray-800">Name</TableHead>
            <TableHead className="border border-gray-800">Code</TableHead>
            <TableHead className="border border-gray-800">Domain</TableHead>
            <TableHead className="border border-gray-800">PIC</TableHead>
            <TableHead className="border border-gray-800">Email</TableHead>
            <TableHead className="border border-gray-800">Role</TableHead>
            <TableHead className="border border-gray-800">Status</TableHead>
            <TableHead className="border border-gray-800">Created</TableHead>
            <TableHead className="border border-gray-800">Updated</TableHead>
            <TableHead className="w-[120px] text-center border border-gray-800">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.length > 0 ? (
            branches.map((branch, idx) => (
              <TableRow key={branch.id} className="border border-gray-800">
                <TableCell className="text-center font-medium border border-gray-800">
                  {idx + 1}
                </TableCell>
                <TableCell className="font-semibold border border-gray-800">
                  {branch.name}
                </TableCell>
                <TableCell className="border border-gray-800">
                  {branch.code}
                </TableCell>
                <TableCell className="border border-gray-800">
                  <Input
                    value={getDomainValue(branch)}
                    onChange={(e) =>
                      handleDomainChange(branch.id, e.target.value)
                    }
                    onBlur={() => handleDomainBlur(branch.id)}
                    onKeyPress={(e) => handleDomainKeyPress(e, branch.id)}
                    className="min-w-[150px] h-8"
                    placeholder="Enter domain"
                  />
                </TableCell>
                <TableCell className="border border-gray-800">
                  {branch.picName}
                </TableCell>
                <TableCell className="border border-gray-800">
                  {branch.picEmail}
                </TableCell>
                <TableCell className="border border-gray-800">
                  {branch.PicRole}
                </TableCell>
                <TableCell className="border border-gray-800">
                  {branch.isActive ? (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500 hover:bg-red-600">
                      Inactive
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm border border-gray-800">
                  {formatDate(branch.createdAt)}
                </TableCell>
                <TableCell className="text-sm border border-gray-800">
                  {formatDate(branch.updatedAt)}
                </TableCell>
                <TableCell className="border border-gray-800">
                  <div className="flex items-center gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleStatus?.(branch.id)}
                      className="h-8 w-8 p-0"
                      title={branch.isActive ? "Deactivate" : "Activate"}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete?.(branch.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="border border-gray-800">
              <TableCell
                colSpan={11}
                className="text-center text-gray-500 py-6 border border-gray-800"
              >
                No branches found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
