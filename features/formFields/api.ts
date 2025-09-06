
// hooks/useFormFields.ts
import { api } from "@/lib/axios";
import { UpdateFormFields,CreateFormFields,FieldType,FormFieldsData,OptionItem } from "@/shared/types/form-fields";
import { API_RESPONSE } from "@/shared/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetFormFields() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["form-fields"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<FormFieldsData[]>>("/form-fields");
      return req.data;
    },
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
  });

  return {
    data: data?.data || [],
    isLoading,
    error,
  };
}

// Get form fields by subcategory
export function useGetFormFieldsBySubCategory(subCategoryID: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["form-fields", "subcategory", subCategoryID],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<FormFieldsData[]>>(`/form-fields/subcategory/${subCategoryID}`);
      return req.data;
    },
    enabled: !!subCategoryID,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data: data?.data || [],
    isLoading,
    error,
  };
}

// Get single form field
export function useGetFormField(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["form-fields", id],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<FormFieldsData>>(`/form-fields/${id}`);
      return req.data;
    },
    enabled: !!id,
  });

  return {
    data: data?.data,
    isLoading,
    error,
  };
}


// Create form field
export function useCreateFormField() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateFormFields) => {
      const response = await api.post("/form-fields", data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["form-fields"] });
      
     
    },
  });
}

// Update form field
export function useUpdateFormField() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateFormFields }) => {
      const response = await api.put(`/form-fields/${id}`, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate all form fields queries
      queryClient.invalidateQueries({ queryKey: ["form-fields"] });
      
      // Update specific form field cache
      queryClient.invalidateQueries({ queryKey: ["form-fields", variables.id] });
    },
  });
}

// Delete form field
export function useDeleteFormField() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/form-fields/${id}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all form fields queries
      queryClient.invalidateQueries({ queryKey: ["form-fields"] });
    },
  });
}

// Batch create form fields
export function useBatchCreateFormFields() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fields: CreateFormFields[]) => {
      const response = await api.post("/form-fields/batch", { fields });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form-fields"] });
    },
  });
}

// Update field order
export function useUpdateFieldOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, order }: { id: number; order: number }) => {
      const response = await api.patch(`/form-fields/${id}/order`, { order });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form-fields"] });
    },
  });
}