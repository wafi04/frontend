// types/formFields.ts
export interface OptionItem {
  value: string;
  label: string;
}

export interface FormFieldsData {
  id: number;
  subCategoryID: number;
  fieldName: string;
  fieldType: string;
  fieldLabel: string;
  fieldOrder: number;
  options: OptionItem[];
}

export interface CreateFormFields {
  subCategoryID: number;
  fieldName: string;
  fieldType: string;
  fieldLabel: string;
  fieldOrder: number;
  options: OptionItem[];
}

export interface UpdateFormFields {
  subCategoryID?: number;
  fieldName?: string;
  fieldType?: string;
  fieldLabel?: string;
  fieldOrder?: number;
  options?: OptionItem[];
}

export interface FieldType {
  value: string;
  label: string;
  needsOptions: boolean;
  description: string;
}
