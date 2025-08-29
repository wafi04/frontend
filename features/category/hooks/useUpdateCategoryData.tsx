// hooks/useUpdateCategory.ts

import { CategoryOmit } from "@/shared/types/category";
import { useState, useEffect, useCallback } from "react";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "./api";

interface UseUpdateCategoryProps {
  data: CategoryOmit[];
  onUpdateSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

export function useUpdateCategory({
  data,
  onUpdateSuccess,
  onDeleteSuccess,
}: UseUpdateCategoryProps) {
  const [editingData, setEditingData] = useState<CategoryOmit[]>(data);
  const [unsavedChanges, setUnsavedChanges] = useState<Set<number>>(new Set());

  const updateMutation = useUpdateCategoryMutation();
  const deleteMutation = useDeleteCategoryMutation();

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
        original.description !== item.description ||
        original.type !== item.type ||
        original.sort_order !== item.sort_order ||
        original.icon !== item.icon ||
        original.is_active !== item.is_active;

      if (isModified) {
        changed.add(item.id);
      }
    });
    setUnsavedChanges(changed);
  }, [editingData, data]); 

  const handleFieldChange = useCallback(
    (id: number, field: string, value: any) => {
      setEditingData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
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
            description: payload.description,
            type: payload.type,
            icon : payload.icon,
            sort_order: payload.sort_order,
            is_active: payload.is_active,
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