import Banner from "@/features/pages/home/components/Banner";
import { LayoutsWithHeaderAndFooter } from "@/providers/NavbarAndFooter";

export default function Home() {
  return (
    <LayoutsWithHeaderAndFooter className="mt-[80px] space-y-[100px]">
      <Banner />
      {/* <FeaturedCollection />
      <Categories /> */}
    </LayoutsWithHeaderAndFooter>
  );
}
