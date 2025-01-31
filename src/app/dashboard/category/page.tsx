import { HandleCreate } from "@/components/dialog/categories/HandleCreate";
import { HeaderDashboard } from "@/components/layout/header/HeaderDashboard";
import CategoriesDataPage from "@/features/pages/categories/category";

export default function DashboardCategory() {
  return (
    <main className="p-6 space-y-6 h-screen  overflow-y-auto">
      <HeaderDashboard
        title="Category"
        subTitle="Manage your product categories here">
        <HandleCreate />
      </HeaderDashboard>
      <CategoriesDataPage />
    </main>
  );
}
