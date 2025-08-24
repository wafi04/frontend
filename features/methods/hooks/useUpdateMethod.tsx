// hooks/useUpdateCategory.ts

import { CategoryOmit } from "@/types/category";
import { useState, useEffect, useCallback } from "react";
import { useDeleteMethodMutation, useUpdateMethodMutation } from "./api";
import { PaymentMethod } from "@/types/method";

interface useUpdateMethodProps {
  data: PaymentMethod[];
  onUpdateSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

export function useUpdateMethod({
  data,
  onUpdateSuccess,
  onDeleteSuccess,
}: useUpdateMethodProps) {
  const [editingData, setEditingData] = useState<PaymentMethod[]>(data);
  const [unsavedChanges, setUnsavedChanges] = useState<Set<number>>(new Set());

  const updateMutation = useUpdateMethodMutation();
  const deleteMutation = useDeleteMethodMutation();

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
        original.code !== item.code ||
        original.status !== item.status ||
        original.minAmount !== item.minAmount ||
        original.maxAmount !== item.maxAmount;

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
            description: payload.description,
            type: payload.type,
            code: payload.code,
            status: payload.status,
            minAmount: payload.minAmount,
            maxAmount: payload.maxAmount,
          },
        });
        onUpdateSuccess?.();
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    },
    [editingData, updateMutation, onUpdateSuccess]
  );

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
    hasUnsaved: (id: number) => unsavedChanges.has(id),
    unsavedChanges, // untuk akses langsung
    handleFieldChange,
    handleSave,
    handleDelete,
    isSaving: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    error: updateMutation.error || deleteMutation.error,
  };
}
