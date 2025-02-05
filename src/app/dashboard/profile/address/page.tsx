import { DialogFormShipping } from "@/components/dialog/user/dialogShipping";
import { HeaderDashboard } from "@/components/layout/header/HeaderDashboard";
import { ShippingPage } from "@/features/pages/dashboard/shipping/shipingPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Shipping Address",
    description: "Shipping Address",
  };
}
export default async function Page() {
  return (
    <>
      <HeaderDashboard title="Shipping Addresses" subTitle="Shipping Addresses">
        <DialogFormShipping />
      </HeaderDashboard>
      <ShippingPage />
    </>
  );
}
