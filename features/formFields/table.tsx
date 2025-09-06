import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
} from "lucide-react";
import { FormFieldsData } from "@/shared/types/form-fields";

interface TableFormFieldsProps {
  data: FormFieldsData[];
  onEdit?: (field: FormFieldsData) => void;
  onDelete?: (id: number) => void;
  onView?: (field: FormFieldsData) => void;
  isLoading?: boolean;
}

export function TableFormFields({
  data,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}: TableFormFieldsProps) {
  // Function to get field type badge variant
  const getFieldTypeVariant = (fieldType: string) => {
    const optionBasedTypes = ["select", "radio", "checkbox", "multiselect"];
    return optionBasedTypes.includes(fieldType) ? "default" : "secondary";
  };

  const renderOptionsPreview = (options: any[]) => {
    if (!options || options.length === 0) return null;

    const displayOptions = options.slice(0, 3);
    const remainingCount = options.length - 3;

    return (
      <div className="flex flex-wrap gap-1">
        {displayOptions.map((option, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {option.label}
          </Badge>
        ))}
        {remainingCount > 0 && (
          <Badge variant="outline" className="text-xs">
            +{remainingCount} more
          </Badge>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order</TableHead>
                <TableHead>Field Name</TableHead>
                <TableHead>Field Label</TableHead>
                <TableHead>Field Type</TableHead>
                <TableHead>Options</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-4  rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4  rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4  rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-16  rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4  rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-8  rounded animate-pulse ml-auto"></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  

  // Sort data by fieldOrder
  const sortedData = [...data].sort((a, b) => a.fieldOrder - b.fieldOrder);

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className=" border  border-gray-800">Order</TableHead>
          <TableHead className="border border-gray-800">Field Name</TableHead>
          <TableHead className="border border-gray-800">Field Label</TableHead>
          <TableHead className="border border-gray-800">Field Type</TableHead>
          <TableHead className="border border-gray-800">Options</TableHead>
          <TableHead className="border border-gray-800">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((field, index) => (
          <TableRow key={field.id} className="border border-gray-800">
            <TableCell className="border border-gray-800">
                <Badge
                  variant="outline"
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                >
                  {field.fieldOrder}
                </Badge>
      
            </TableCell>

            <TableCell className="border border-gray-800">
                {field.fieldName}
            </TableCell>

            <TableCell className="border border-gray-800">
              {field.fieldLabel}
            </TableCell>

            <TableCell className="border border-gray-800">
              <Badge variant={getFieldTypeVariant(field.fieldType)}>
                {field.fieldType}
              </Badge>
            </TableCell>

            <TableCell className="border border-gray-800">
              {field.options && field.options.length > 0 ? (
                <div className="space-y-1">
                  {renderOptionsPreview(field.options)}
                  <div className="text-xs text-gray-500">
                    {field.options.length} option
                    {field.options.length !== 1 ? "s" : ""}
                  </div>
                </div>
              ) : (
                <span className="text-gray-400 text-sm">No options</span>
              )}
            </TableCell>

            <TableCell className="border border-gray-800">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onView && (
                    <>
                      <DropdownMenuItem onClick={() => onView(field)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(field)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(field.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
