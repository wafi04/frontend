// hooks/useUpdateCategory.ts

import { useUpdateCategoryMutation } from "@/features/category/hooks/api";
import { CategoryOmit } from "@/shared/types/category";
import { useState, useEffect, useCallback } from "react";
import {
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from "./api";
import { SubCategory } from "@/shared/types/subcategory";

interface useUpdateSubCategoryProps {
  data: SubCategory[];
  onUpdateSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

export function useUpdateSubCategory({
  data,
  onUpdateSuccess,
  onDeleteSuccess,
}: useUpdateSubCategoryProps) {
  const [editingData, setEditingData] = useState<SubCategory[]>(data);
  const [unsavedChanges, setUnsavedChanges] = useState<Set<number>>(new Set());

  const updateMutation = useUpdateSubCategoryMutation();
  const deleteMutation = useDeleteSubCategoryMutation();

  useEffect(() => {
    setEditingData(data);
  }, [data]);

  useEffect(() => {
    const changed = new Set<number>();
    editingData.forEach((item) => {
      const original = data.find((d) => d.id === item.id);
      if (!original) return;

      const isModified =
        original.name !== item.name ||
        original.subName !== item.subName ||
        original.brand !== item.brand ||
        original.information !== item.information ||
        original.instruction !== item.instruction ||
        original.isActive !== item.isActive ||
        original.isCheckNickname !== item.isCheckNickname;

      if (isModified) {
        changed.add(item.id);
      }
    });
    setUnsavedChanges(changed);
  }, [editingData, data]);

  const handleFieldChange = useCallback(
    (id: number, field: string, value: any) => {
      setEditingData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    },
    []
  );

  const handleSave = useCallback(
    async (id: number) => {
      const payload = editingData.find((item) => item.id === id);
      if (!payload) return;

      try {
        await updateMutation.mutateAsync({
          id,
          payload: {
            name: payload.name,
            subName: payload.subName,
            brand: payload.brand,
            information: payload.information,
            isActive: payload.isActive,
            instruction: payload.instruction,
            isCheckNickname: payload.isCheckNickname,
          },
        });
        onUpdateSuccess?.();
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    },
    [editingData, updateMutation, onUpdateSuccess]
  );

  // ✅ Hapus
  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteMutation.mutateAsync(id);
        onUpdateSuccess?.(); // bisa juga onDeleteSuccess
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    },
    [deleteMutation, onUpdateSuccess]
  );

  return {
    editingData,
    hasUnsaved: (id: number) => unsavedChanges.has(id), // tetap bisa dipakai
    unsavedChanges, // untuk akses langsung
    handleFieldChange,
    handleSave,
    handleDelete,
    isSaving: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    error: updateMutation.error || deleteMutation.error,
  };
}
