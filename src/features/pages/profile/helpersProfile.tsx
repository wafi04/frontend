"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateForInput } from "@/utils/Format";

interface HelpersDetailsProps {
  field: string;
  label: string;
  type?: string;
  options?: string[];
  isEditing: string | null;
  setIsEditing: (field: string | null) => void;
  formData: any;
  handleFieldChange: (field: string, value: string | boolean) => void;
  saveChanges: () => void;
}

export function HelpersDetails({
  field,
  label,
  type = "text",
  options,
  isEditing,
  setIsEditing,
  formData,
  handleFieldChange,
  saveChanges,
}: HelpersDetailsProps) {
  const getValue = (field: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      return formData?.[parent]?.[child];
    }
    return formData?.[field];
  };

  const value = getValue(field);
  const displayValue = type === "date" ? formatDateForInput(value) : value;

  if (type === "select") {
    return (
      <div className="space-y-2 relative">
        <div className="flex justify-between items-center">
          <p className="font-medium">{label}</p>
          {isEditing !== field && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsEditing(field)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
        {isEditing === field ? (
          <Select
            value={value}
            onValueChange={(newValue) => handleFieldChange(field, newValue)}>
            <SelectTrigger>
              <SelectValue>{displayValue || "Select..."}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-sm text-gray-600">{value || "Not provided"}</p>
        )}
      </div>
    );
  }

  if (type === "switch") {
    return (
      <div className="space-y-2 relative">
        <div className="flex justify-between items-center">
          <p className="font-medium">{label}</p>
        </div>
        <Switch
          checked={Boolean(value)}
          onCheckedChange={(checked) => handleFieldChange(field, checked)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2 relative">
      <div className="flex justify-between items-center">
        <p className="font-medium">{label}</p>
        {isEditing !== field && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsEditing(field)}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
      {isEditing === field ? (
        type === "textarea" ? (
          <div className="space-y-2">
            <Textarea
              value={value || ""}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              className="w-full"
              autoFocus
            />
            <Button onClick={saveChanges}>Save</Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              type={type}
              value={type === "date" ? displayValue : value || ""}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              className="w-full"
              autoFocus
            />
            <Button onClick={saveChanges}>Save</Button>
          </div>
        )
      ) : (
        <p className="text-sm text-gray-600">
          {type === "date" && value
            ? new Date(value).toLocaleDateString()
            : type === "boolean"
            ? value
              ? "Yes"
              : "No"
            : value || "Not provided"}
        </p>
      )}
    </div>
  );
}
