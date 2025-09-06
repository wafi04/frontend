import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { useCreateFormField } from "./api";
import { CreateFormFields } from "@/shared/types/form-fields";
import { useGetAllSubCategory } from "../subcategories/hooks/api";

const optionSchema = z.object({
  value: z.string().min(1, "Option value is required"),
  label: z.string().min(1, "Option label is required"),
});

const formFieldSchema = z.object({
  subCategoryID: z.number().min(1, "Sub category is required"),
  fieldName: z.string().min(1, "Field name is required"),
  fieldType: z.string().min(1, "Field type is required"),
  fieldLabel: z.string().min(1, "Field label is required"),
  fieldOrder: z.number().min(0, "Field order must be 0 or greater"),
  options: z.array(optionSchema).optional(),
});

type FormFieldFormData = z.infer<typeof formFieldSchema>;

interface FormFieldFormProps {
  subCategoryID?: number;
  onSuccess?: (data: any) => void;
  onCancel?: () => void;
}

export function FormFieldForm({ 
  subCategoryID, 
  onSuccess, 
  onCancel 
}: FormFieldFormProps) {
    const {data}  = useGetAllSubCategory({
        search : "",
        limit : "100",
        page : "1"
    })
    const subCategoryData = data?.data.data ?? []

  const createFormField = useCreateFormField();
  const [selectedFieldType, setSelectedFieldType] = useState<any>(null);

  const fieldTypes = [
    {
      value: "text",
      label: "Text Input",
      needsOptions: false,
      description: "text input",
    },
    {
      value: "select",
      label: "Dropdown/Select",
      needsOptions: true,
      description: "Pilihan ",
    },
    
  ];

  const form = useForm<FormFieldFormData>({
    resolver: zodResolver(formFieldSchema),
    defaultValues: {
      subCategoryID: subCategoryID || 0,
      fieldName: "",
      fieldType: "",
      fieldLabel: "",
      fieldOrder: 0,
      options: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const watchedFieldType = form.watch("fieldType");

  useEffect(() => {
    const fieldType = fieldTypes.find((ft) => ft.value === watchedFieldType);
    setSelectedFieldType(fieldType || null);
    
    if (fieldType && !fieldType.needsOptions) {
      form.setValue("options", []);
    }
  }, [watchedFieldType, form]);

  const onSubmit = (data: FormFieldFormData) => {
    try {
      const payload: CreateFormFields = {
        ...data,
        options: selectedFieldType?.needsOptions ? data.options || [] : [],
      };
      
      const result = createFormField.mutate(payload);
      onSuccess?.(result);
      form.reset();
    } catch (error) {
      console.error("Error creating form field:", error);
    }
  };

  const addOption = () => {
    append({ value: "", label: "" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* SubCategory Selection */}
        <FormField
          control={form.control}
          name="subCategoryID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Category</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(parseInt(value))} 
                defaultValue={field.value?.toString()}
                disabled={!!subCategoryID} // Disable if subCategoryID is passed as prop
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subCategoryData.map((subCategory: any) => (
                    <SelectItem key={subCategory.id} value={subCategory.id.toString()}>
                      {subCategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the sub category for this form field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fieldName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Name</FormLabel>
              <FormControl>
                <Input placeholder="GameId" {...field} />
              </FormControl>
              <FormDescription>
                Internal name used in code (e.g., gameId, userId)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fieldLabel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Label</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Game Id" {...field} />
              </FormControl>
              <FormDescription>
                Label that will be displayed to users
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fieldType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {type.label}
                        {type.needsOptions && (
                          <Badge variant="secondary" className="text-xs">
                            Options
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedFieldType && (
                <FormDescription>
                  {selectedFieldType.description}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fieldOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Order</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>
                Order in which this field appears in the form (0 = first)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedFieldType?.needsOptions && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>Options</FormLabel>
              <Button type="button" onClick={addOption} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>
            
            <div className="space-y-3">
              {fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name={`options.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Option value" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`options.${index}.label`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Option label" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {fields.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No options added yet. Click "Add Option" to get started.
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={createFormField.isPending}
          >
            {createFormField.isPending ? "Creating..." : "Create Field"}
          </Button>
        </div>
      </form>
    </Form>
  );
}