import { TableCategory } from "@/features/category/components/table";
import { dataCategories } from "../../../data/dummy/category";

export default function CategoryPage() {
  return (
    <>{dataCategories && <TableCategory data={dataCategories || []} />};</>
  );
}
