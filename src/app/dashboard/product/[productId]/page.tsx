import { ProductVariantPage } from "@/features/pages/dashboard/product/ProductVariants";

export default function DashboardProductIdPage({
  params,
}: {
  params: { productId: string };
}) {
  return <ProductVariantPage productId={params.productId} />;
}
