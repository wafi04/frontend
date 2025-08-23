type SortDirection = "asc" | "desc" | null;

interface SortConfig {
  key: string;
  direction: SortDirection;
}

interface ColumnConfig {
  key: string;
  header: string;
  width: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  editable?: boolean;
  type?: "text" | "number" | "boolean" | "date";
}

interface EditingCell {
  rowId: number | string;
  field: string;
}
