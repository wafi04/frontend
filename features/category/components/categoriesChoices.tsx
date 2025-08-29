"use client"

import { useGetAllCategory } from "@/features/category/hooks/api"
import { useFilterMain } from "@/features/subcategories/hooks/filterMain"
import type { Category } from "@/shared/types/category"

export function CategoriesChoices() {
  const { data, isLoading } = useGetAllCategory()
  const {setCategory,category : stateCategory} = useFilterMain()
  if (isLoading) {
    return (
      <section className="w-full  mx-auto p-4">
        <div className="border   rounded-lg p-6 mb-6">
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 w-20 bg-gray-200 rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }



  const sortedCategories =
    data?.data
      ?.filter((category: Category) => category.is_active)
      .sort((a: Category, b: Category) => a.sort_order - b.sort_order) || []

  return (
     <section className="w-full my-10 mx-auto ">
     <div className="text-center mb-6 space-y-2">
    <h3 className="text-2xl font-bold ">
      ✨ Kategori Pilihan Terbaik
    </h3>
    <p className="text-gray-300 text-sm md:text-base">
      Temukan layanan digital terpercaya dengan harga terjangkau
    </p>
  </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-2">
          {sortedCategories.map((category: Category) => (
            <button
              key={category.id}
              className={`${category.id === stateCategory ? "bg-primary" : "bg-secondary"} flex items-center gap-2  p-2 rounded-full border hover:bg-primary  transition-colors text-sm font-medium `}
              onClick={() => {
                setCategory(category.id)
              }}
            >
              <span className="text-base" role="img" aria-label={category.name}>
                {category.icon}
              </span>
              <span className="whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>

    </section>
  )
}
