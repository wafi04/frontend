
import { HandleCreateProduct } from "@/components/dialog/product/HandleCreate";
import { HeaderDashboard } from "@/components/layout/header/HeaderDashboard";
import { ProductsSectionDashboard } from "@/features/pages/dashboard/product/Products";

export default function Page() {
  return (
    <main className="p-6 space-y-6 ">
      <HeaderDashboard
        title="Product"
        subTitle="Optimize  your Product  in here">
        <HandleCreateProduct />
      </HeaderDashboard>
      <ProductsSectionDashboard />
    </main>
  );
}
