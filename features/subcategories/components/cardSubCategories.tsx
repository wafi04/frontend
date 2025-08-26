import Link from "next/link"
import { useGetAllSubCategory, useGetSubCategoryByCategories } from "../hooks/api"
import Image from "next/image"
import { memo } from "react"
import { SubCategory } from "@/types/subcategory"
import { useGetCategoryByType } from "@/features/category/hooks/api"
import { useFilterMain } from "../hooks/filterMain"

function SubCategoryCard({ item } : {item : SubCategory}) {
    return (
        <Link 
            key={item.id} 
            href={`/${item.brand.trim()}`} 
            className="outline-none opacity-100 transform-none"
            prefetch={false}
        >
            <div className="group relative transform overflow-hidden rounded-2xl bg-muted duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background">
                <Image 
                    src={item.thumbnail} 
                    alt={item.name} 
                    priority={false}
                    width={300} 
                    height={300} 
                    className="aspect-[4/6] object-cover object-center" 
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
    )
}

export default function CardSubCategories(){
    const {category}  = useFilterMain()
    const { data } = useGetSubCategoryByCategories(category)

    return (
        <section className="mb-4 grid grid-cols-3 gap-4 sm:mb-8 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-5 xl:grid-cols-6 opacity-100 transform-none">
            {data?.map((item) => (
                <SubCategoryCard key={item.id} item={item} />
            ))}
        </section>
    )
}