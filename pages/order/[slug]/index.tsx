import { Navbar } from "@/components/layout/navbar";
import { BannerOrder } from "@/shared/components/order/banner";
import { HeaderProuct } from "@/shared/components/order/headerProduk";
import { FormOrder } from "@/shared/components/order/formOrder";
import { useGetSubCategoryBySubName } from "@/features/subcategories/hooks/api";
import { ProductDataCard } from "@/shared/components/order/productCard";
import { MethodSection } from "@/shared/components/order/method";
import { Reveiews } from "@/shared/components/order/reviews";
import { VoucherInput } from "@/shared/components/order/voucherInput";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

export default function Order() {
    const router = useRouter();

  const { slug } = router.query;
  const { data ,isLoading} = useGetSubCategoryBySubName(slug as string);

if (isLoading && !data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
      </div>
    );
  }
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
                <FormOrder subCategoryId={data?.data.subCategoryId as number}/>
                {data?.data.productTypes && (
                  <ProductDataCard productData={data?.data.productTypes} />
                )}
                <MethodSection />
                <VoucherInput />
              </div>
              {/* reviews */}
              <Reveiews img={data?.data.subCategoryThumbnail} />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
