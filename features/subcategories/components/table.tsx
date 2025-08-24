import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubCategory } from "@/types/subcategory";
import { Switch } from "@/components/ui/switch";
import { useUpdateSubCategory } from "../hooks/useUpdate";
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";

interface TableSubCategoriesProps {
  data: SubCategory[];
}

export function TableSubCategories({ data }: TableSubCategoriesProps) {
  const {
    editingData,
    hasUnsaved,
    handleFieldChange,
    handleSave,
    handleDelete,
    unsavedChanges,
    isSaving,
    isDeleting,
  } = useUpdateSubCategory({
    data,
    onUpdateSuccess: () => {},
    onDeleteSuccess: () => {},
  });
  return (
    <section className="mt-5">
      <Table>
        <TableHeader>
          <TableRow className="border">
            <TableHead className="w-[60px] border-r">ID</TableHead>
            <TableHead className="border-r">Name</TableHead>
            <TableHead className="border-r">SubName</TableHead>
            <TableHead className="border-r">Brand</TableHead>
            <TableHead className="border-r">Image</TableHead>
            <TableHead className="border-r">Banner</TableHead>
            <TableHead className="border-r">Information</TableHead>
            <TableHead className="border-r">Instruction</TableHead>
            <TableHead className="text-center border-r">Active</TableHead>
            <TableHead className="text-center border-r">
              Check Nickname
            </TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border">
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={10}
                className="h-24 text-center text-muted-foreground"
              >
                No subcategories found.
              </TableCell>
            </TableRow>
          ) : (
            editingData.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-muted/50 transition-colors"
              >
                {/* ID */}
                <TableCell className="font-medium border-r">
                  {item.id}
                </TableCell>

                {/* Name */}
                <TableCell className="border-r">
                  <Input
                    className="border-0 shadow-none focus-visible:ring-0 p-1 h-8"
                    value={item.name}
                    onChange={(e) =>
                      handleFieldChange(item.id, "name", e.target.value)
                    }
                    placeholder="Sub Category name"
                  />
                </TableCell>

                {/* SubName */}
                <TableCell className="border-r">
                  <Input
                    className="border-0 shadow-none focus-visible:ring-0 p-1 h-8"
                    value={item.subName}
                    onChange={(e) =>
                      handleFieldChange(item.id, "subName", e.target.value)
                    }
                    placeholder="Sub Category subName"
                  />
                </TableCell>

                {/* Brand */}
                <TableCell className="border-r font-medium">
                  <Input
                    className="border-0 shadow-none focus-visible:ring-0 p-1 h-8"
                    value={item.brand}
                    onChange={(e) =>
                      handleFieldChange(item.id, "brand", e.target.value)
                    }
                    placeholder="Sub Category brand"
                  />
                </TableCell>

                {/* Thumbnail */}
                <TableCell className="border-r">
                  <div className="flex items-center justify-center">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="h-10 w-10 object-cover rounded-md border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/images/placeholder.png";
                      }}
                    />
                  </div>
                </TableCell>

                {/* Banner URL */}
                <TableCell className="border-r">
                  <div className="flex items-center justify-center">
                    <img
                      src={item.bannerUrl}
                      alt="Banner"
                      className="h-8 w-20 object-cover rounded border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/images/placeholder-banner.png";
                      }}
                    />
                  </div>
                </TableCell>

                {/* Information */}
                <TableCell
                  className="border-r max-w-xs truncate text-sm"
                  title={item.information}
                >
                  <Input
                    className="border-0 shadow-none focus-visible:ring-0 p-1 h-8"
                    value={item.information}
                    onChange={(e) =>
                      handleFieldChange(item.id, "information", e.target.value)
                    }
                    placeholder="Sub Category informasi"
                  />
                </TableCell>

                {/* Instruction */}
                <TableCell
                  className="border-r max-w-xs truncate text-sm"
                  title={item.instruction}
                >
                  <Input
                    className="border-0 shadow-none focus-visible:ring-0 p-1 h-8"
                    value={item.instruction}
                    onChange={(e) =>
                      handleFieldChange(item.id, "instruction", e.target.value)
                    }
                    placeholder="Sub Category instruction"
                  />
                </TableCell>

                {/* Is Active */}
                <TableCell className="border-r text-center">
                  <Switch
                    checked={item.isActive}
                    onCheckedChange={(checked) =>
                      handleFieldChange(item.id, "isActive", checked)
                    }
                    className="scale-75 transform translate-y-1"
                  />
                </TableCell>

                {/* Is Check Nickname */}
                <TableCell className="border-r text-center">
                  <Switch
                    checked={item.isCheckNickname}
                    onCheckedChange={(checked) =>
                      handleFieldChange(item.id, "isCheckNickname", checked)
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
                      onClick={() => handleSave(item.id)}
                      disabled={!unsavedChanges.has(item.id)}
                    >
                      <Save className="h-3.5 w-3.5" />
                    </Button>
                    {unsavedChanges.has(item.id) && (
                      <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full ring-1 ring-white"></span>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-red-900/60 text-red-700 hover:bg-red-500"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
}
