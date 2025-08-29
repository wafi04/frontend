import Link from "next/link";
import { useGetSubCategoryByCategories } from "../hooks/api";
import Image from "next/image";
import { SubCategory } from "@/shared/types/subcategory";
import { useFilterMain } from "../hooks/filterMain";

function SubCategoryCard({ item }: { item: SubCategory }) {
  return (
    <Link
      className="relative outline-none opacity-100 transform-none"
      tabIndex={0}
      href={`/id-id/${item.brand}`}
    >
      <div className="group relative transform overflow-hidden rounded-2xl bg-muted duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background">
        <Image
          alt="Roblox"
          fetchPriority="high"
          width={192}
          height={288}
          decoding="async"
          className="aspect-[4/6] object-cover w-full"
          sizes="100vw"
          src={
            item.thumbnail ||
            "https://client-cdn.bangjeff.com/veinstore.id/product/roblox.webp"
          }
        />
        <article className="absolute inset-x-0 -bottom-10 z-10 flex transform flex-col px-3 transition-all duration-300 ease-in-out group-hover:bottom-3 sm:px-4 group-hover:sm:bottom-4">
          <h2 className="truncate text-sm font-semibold text-foreground sm:text-base">
            {item.name}
          </h2>
          <p className="truncate text-xxs text-foreground sm:text-xs">
            {item.subName}
          </p>
        </article>
        <div className="absolute inset-0 transform bg-gradient-to-t from-transparent transition-all duration-300 group-hover:from-background" />
      </div>
    </Link>
  );
}

export default function CardSubCategories() {
  const { category } = useFilterMain();
  const { data } = useGetSubCategoryByCategories(category);

  return (
    <div className="my-8">
      <div
        id="3D"
        role="tabpanel"
        aria-labelledby="headlessui-tabs-tab-r0"
        tabIndex={0}
        data-headlessui-state="selected"
        className="border rounded-lg"
      >
        <div className="mb-4 grid grid-cols-3 gap-4 sm:mb-8 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-5 xl:grid-cols-6">
          {data?.map((item) => (
            <SubCategoryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
