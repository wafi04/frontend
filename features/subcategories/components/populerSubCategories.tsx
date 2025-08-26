import Image from "next/image";
import { useGetSubCategoryByCategories } from "../hooks/api";
import Link from "next/link";

export function PopulerSection() {
  const { data } = useGetSubCategoryByCategories(7);
  return (
    <section className="container my-5">
      <div className="mb-5 text-foreground">
        <div className="text-lg font-semibold uppercase leading-relaxed tracking-wider">
          🔥 POPULER SEKARANG !
        </div>
        <p className="pl-6 text-xs">
          💫 Silahkan Temukan Game Kamu Di PENCARIAN 🔍
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 opacity-100 transform-none">
        {data.map((item) => (
          <li
            key={item.id}
            className="group/product-card relative z-0 [--card-padding:theme(spacing.2)] [--card-radius:theme(borderRadius.2xl)] "
          >
            <Link
              className="flex outline-none items-center gap-x-2 rounded-[--card-radius] 
               bg-[hsl(var(--popular-background))] 
               [background-image:var(--popular-image)]
               bg-no-repeat bg-cover text-foreground duration-300 ease-in-out 
               hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background 
               md:gap-x-3"
              href={`/id-id/${item.brand}`}
            >
              <div className="flex items-center gap-3 p-[--card-padding]">
                <img
                  alt="Mobile Legends"
                  fetchPriority="high"
                  width="56"
                  height="56"
                  decoding="async"
                  data-nimg="1"
                  className="aspect-square h-14 w-14 rounded-[calc(var(--card-radius)-var(--card-padding))] object-cover object-center duration-300 group-hover/product-card:scale-110 group-hover/product-card:rounded-xl group-hover/product-card:shadow-2xl md:h-20 md:w-20"
                  sizes="100vw"
                  src={item.thumbnail}
                  //   style="color: transparent;"
                />
                <div className="relative flex w-full flex-col">
                  <h2 className="w-[80px] truncate text-xxs font-semibold text-foreground sm:w-[125px] md:w-[150px] md:text-base lg:w-[175px]">
                    {item.name}
                  </h2>
                  <p className="text-xxs text-foreground md:text-sm">
                    {item.brand}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
