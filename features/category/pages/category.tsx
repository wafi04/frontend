import { TableCategory } from "@/features/category/components/table";
import { dataCategories } from "../../../data/dummy/category";
import { useGetAllCategory } from "../hooks/api";

export default function CategoryPage() {
  const { data, error, isLoading } = useGetAllCategory();
  return <>{data?.data && <TableCategory data={data?.data || []} />};</>;
}
