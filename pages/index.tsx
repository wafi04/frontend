import Banner from "@/components/layout/banner";
import { CategoriesChoices } from "@/features/category/components/categoriesChoices";
import { Navbar } from "@/components/layout/navbar";
import CardSubCategories from "@/features/subcategories/components/cardSubCategories";
import { PopulerSection } from "@/features/subcategories/components/populerSubCategories";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative bg-background container">
        <Banner />
        <PopulerSection />
        <CategoriesChoices />
        <CardSubCategories />
      </main>
      <Footer />
    </>
  );
}
