"use client";

import { CategoryOmit } from "@/types/category";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { typeCategory } from "../data/typeCategory";
import { Button } from "@/components/ui/button";
import {  Trash2, Save, Phone, Wifi, Lightbulb, Wallet, Star, Ticket ,Gamepad, PhoneIcon} from "lucide-react";
import { useUpdateCategory } from "../hooks/useUpdateCategoryData";
import Image from "next/image";

interface TableCategoryProps {
  data: CategoryOmit[];
}

export const TableCategory = ({ data }: TableCategoryProps) => {
  const {
    editingData,
    hasUnsaved,
    handleFieldChange,
    handleSave,
    handleDelete,
    unsavedChanges,
    isSaving,
    isDeleting,
  } = useUpdateCategory({
    data,
    onUpdateSuccess: () => {},
    onDeleteSuccess: () => {},
  });

  return (
    <div className="py-4 px-6">
      <HeaderDashboard
        title="Manajemen Kategoris"
      />

      <div className="border mt-4 rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] border-r">ID</TableHead>
              <TableHead className="border-r">Name</TableHead>
              <TableHead className="border-r">Icon</TableHead>
              <TableHead className="border-r">Description</TableHead>
              <TableHead className="border-r">Type</TableHead>
              <TableHead className="text-center border-r w-[120px]">
                Sort Order
              </TableHead>
              <TableHead className="text-center border-r w-[100px]">
                Status
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {editingData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              editingData.map((category) => (
                <TableRow
                  key={category.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium border-r">
                    {category.id}
                  </TableCell>

                  <TableCell className="border-r">
                    <Input
                      className="border-0 shadow-none focus-visible:ring-0 p-1 h-8"
                      value={category.name}
                      onChange={(e) =>
                        handleFieldChange(category.id, "name", e.target.value)
                      }
                      placeholder="Category name"
                    />
                  </TableCell>

                  <TableCell className="border-r">
                  <TableCell className="flex items-center justify-center">
                    {category.icon}
                </TableCell>
                  </TableCell>

                  <TableCell className="border-r">
                    <Input
                      className="border-0 shadow-none focus-visible:ring-0 p-1 h-8"
                      value={category.description}
                      onChange={(e) =>
                        handleFieldChange(
                          category.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Description"
                    />
                  </TableCell>

                  <TableCell className="border-r">
                    <Select
                      value={category.type}
                      onValueChange={(value) =>
                        handleFieldChange(category.id, "type", value)
                      }
                    >
                      <SelectTrigger className="border-0 shadow-none focus:ring-0 h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {typeCategory().map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="border-r">
                    <Input
                      type="number"
                      className="border-0 shadow-none focus-visible:ring-0 p-1 h-8 text-center w-20 mx-auto"
                      value={category.sort_order}
                      onChange={(e) =>
                        handleFieldChange(
                          category.id,
                          "sort_order",
                          parseInt(e.target.value) || 0
                        )
                      }
                      min="0"
                    />
                  </TableCell>

                  <TableCell className="text-center border-r">
                    <Switch
                      checked={category.is_active}
                      onCheckedChange={(checked) =>
                        handleFieldChange(category.id, "is_active", checked)
                      }
                      className="scale-75 transform translate-y-1"
                    />
                  </TableCell>

                  <TableCell className="flex items-center gap-1.5 pl-2">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-green-100 text-green-700"
                        onClick={() => handleSave(category.id)}
                        disabled={!unsavedChanges.has(category.id)}
                      >
                        <Save className="h-3.5 w-3.5" />
                      </Button>
                      {unsavedChanges.has(category.id) && (
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full ring-1 ring-white"></span>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-red-900/60 text-red-700 hover:bg-red-500"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
