import { Navbar } from "@/components/layout/navbar";
import { BannerOrder } from "@/shared/components/order/banner";
import { HeaderProuct } from "@/shared/components/order/headerProduk";
import { FormOrder } from "@/shared/components/order/formOrder";
import { useGetSubCategoryBySubName } from "@/features/subcategories/hooks/api";
import { ProductDataCard } from "@/shared/components/order/productCard";
import { MethodSection } from "@/shared/components/order/method";
import { Reveiews } from "@/shared/components/order/reviews";
import ContactPerson from "@/shared/components/order/contactPerson";

export default function Order() {
  const { data } = useGetSubCategoryBySubName("moonton");
  return (
    <>
      <Navbar />
      <main className="relative bg-background">
        <BannerOrder />
        <section
          aria-labelledby="main-title"
          className="bg-title-product flex min-h-32 w-full items-center border-b bg-transparent lg:min-h-[160px] bg-order-header-background"
        >
          <div className="container">
            {data && (
              <HeaderProuct
                name={data?.data.subCategoryName || "Produk Tidak Ditemukan"}
                subName={data?.data.subCategorySubName || ""}
              />
            )}
          </div>
        </section>
        <div className="mt-4 lg:mt-8">
          <div className="mt-0 lg:block">
            <form
              action=""
              className="container relative mt-4 grid grid-cols-3 gap-4 md:gap-8 lg:mt-8"
            >
              <div className="col-span-3 col-start-1 flex flex-col gap-4 lg:col-span-2 lg:gap-8">
                <FormOrder />
                {data?.data.productTypes && (
                  <ProductDataCard productData={data?.data.productTypes} />
                )}
                <MethodSection />
                <ContactPerson />
              </div>
              {/* reviews */}
              <Reveiews />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
