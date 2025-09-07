import Banner from "@/shared/components/banner/components/banner";
import { CategoriesChoices } from "@/features/category/components/categoriesChoices";
import { Navbar } from "@/components/layout/navbar";
import CardSubCategories from "@/features/subcategories/components/cardSubCategories";
import { Footer } from "@/components/layout/footer";
import { CardFlashSale } from "@/shared/components/flashsale/cardFlashSale";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative bg-background container">
        <Banner />
        {/* <PopulerSection /> */}
        <CardFlashSale />
        <CategoriesChoices />
        <CardSubCategories />
      </main>
      <Footer />
    </>
  );
}
