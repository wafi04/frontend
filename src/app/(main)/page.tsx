import Banner from "@/features/pages/home/components/Banner";
import FeaturedCollection from "@/features/pages/home/components/FeaturedCollections";
import { LayoutsWithHeaderAndFooter } from "@/providers/NavbarAndFooter";

export default function Home() {
  return (
    <LayoutsWithHeaderAndFooter className="mt-[80px] space-y-[100px]">
      <Banner />
      <FeaturedCollection />
      {/* <Categories /> */}
    </LayoutsWithHeaderAndFooter>
  );
}
