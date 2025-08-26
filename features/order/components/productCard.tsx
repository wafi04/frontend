import { Product, SubCategoriesData } from "@/types/productPrice";
import { FormatCurrency } from "@/utils/format";
import { HeaderOrder } from "./headerOrder";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ProductDataCard({
  productData,
  subCategories,
}: {
  productData: Product[];
  subCategories: SubCategoriesData[] | null;
}) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    if (!selectedSubCategory) return productData;
    return productData.filter(product => product.subCategoryID === selectedSubCategory);
  }, [productData, selectedSubCategory]);

  const currentSubCategoryName = useMemo(() => {
    if (!selectedSubCategory || !subCategories) return "Semua Produk";
    const found = subCategories.find(sub => sub.id === selectedSubCategory);
    return found ? found.name : "Semua Produk";
  }, [selectedSubCategory, subCategories]);

  return (
    <section className="relative scroll-mt-20 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 shadow-2xl backdrop-blur-md border border-border/50 md:scroll-mt-[7.5rem]">
      {/* Header with enhanced gradient */}
      <HeaderOrder id={2} subName="Pilih Nominal" />
      
      {/* Content with improved spacing */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 pb-6">
          {/* Left side - title */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
              <span className="text-sm">✨</span>
            </div>
            <h3 className="text-lg font-bold text-card-foreground">
              {currentSubCategoryName}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          {/* Right side - filter dropdown */}
              {subCategories && subCategories.length > 0 && (
            <div className="relative">
              <select
                value={selectedSubCategory || ""}
                onChange={(e) => setSelectedSubCategory(e.target.value ? parseInt(e.target.value) : null)}
                className="appearance-none bg-gradient-to-br from-background to-background/80 border border-border/50 rounded-xl px-4 py-2 pr-10 text-sm font-medium text-card-foreground shadow-lg backdrop-blur-sm hover:border-primary/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 cursor-pointer"
              >
                <option value="">Semua Kategori</option>
                {subCategories.map((subCat) => (
                  <option key={subCat.id} value={subCat.id}>
                    {subCat.name}
                  </option>
                ))}
              </select>
              
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Products count indicator */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">
              Menampilkan {filteredProducts.length} dari {productData.length} produk
            </span>
            {selectedSubCategory && (
              <button
                onClick={() => setSelectedSubCategory(null)}
                className="text-xs text-primary hover:text-primary/80 underline transition-colors"
              >
                Reset Filter
              </button>
            )}
          </div>
        )}

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {filteredProducts.map((item, index) => (
              <div
                key={item.id}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-background/80 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:border-primary/60 hover:shadow-2xl hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Enhanced background with better overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-500 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500" />

                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content with improved layout */}
                <div className="relative flex flex-col justify-between p-4 h-full min-h-[140px]">
                  {/* Brand with badge style */}
                  <div className="mb-3">
                    <span className="inline-flex items-center rounded-full bg-muted/80 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm border border-border/50">
                      {item.name}
                    </span>
                  </div>

                  {/* Product Info with enhanced styling */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-sm group-hover:blur-none transition-all duration-300" />
                      <img
                        className="relative h-12 w-12 object-contain rounded-xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 bg-background/80 p-1 border border-border/30"
                        src={"https://placehold.co/100x100?text=Logo"}
                        alt={item.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-primary truncate group-hover:text-primary/90 transition-colors">
                        {item.name}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {FormatCurrency(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-muted-foreground">
                        Tersedia
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-primary/60 group-hover:text-primary transition-colors">
                      <span className="text-xs font-medium">Pilih</span>
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
              <span className="text-2xl opacity-50">📦</span>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-muted-foreground mb-4">
              Tidak ada produk yang sesuai dengan filter yang dipilih
            </p>
            {selectedSubCategory && (
              <button
                onClick={() => setSelectedSubCategory(null)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Tampilkan Semua Produk
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}