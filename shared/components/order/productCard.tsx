"use client";

import { useState } from "react";
import { ProductOrder } from "@/shared/types/subcategory";
import { FormatCurrency } from "@/utils/format";
import { useOrder } from "@/shared/hooks/formOrder";

export function ProductDataCard({
  productData,
}: {
  productData: {
    products: ProductOrder[];
    typeName: string;
  }[];
}) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductOrder | null>(
    null
  );

  const {
    formData,
    productPrice,
    setProductCode,
    setFormData,
    setProductPrice,
  } = useOrder();

  const typeNames = Array.from(new Set(productData.map((d) => d.typeName)));

  const filteredData = selectedType
    ? productData.filter((d) => d.typeName === selectedType)
    : productData;

  return (
    <section className="relative scroll-mt-20 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 shadow-2xl backdrop-blur-md border border-border/50 md:scroll-mt-[7.5rem]">
      {/* Header */}
      <div className="flex items-center overflow-hidden rounded-t-2xl bg-gradient-to-r from-primary via-primary/95 to-primary/90 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="relative flex h-12 w-12 items-center justify-center bg-gradient-to-br from-primary-foreground/20 to-primary-foreground/10 backdrop-blur-sm font-bold text-primary-foreground text-lg border-r border-primary-foreground/20">
          2
        </div>
        <div className="relative flex items-center gap-2 px-4 py-3">
          <div className="h-2 w-2 rounded-full bg-primary-foreground/60 animate-pulse" />
          <h2 className="text-sm font-bold text-primary-foreground tracking-wide">
            Pilih Nominal
          </h2>
        </div>
      </div>

      {/* Filter */}
      <div className="p-4 flex flex-wrap gap-2 border-b border-border/30">
        <button
          type="button"
          onClick={() => setSelectedType(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
            selectedType === null
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Semua
        </button>
        {typeNames.map((t) => (
          <button
            type="button"
            key={t}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedType(t);
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
              selectedType === t
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {filteredData.map((item, index) => (
          <div key={index} className="space-y-4">
            {/* Sub Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
                <span className="text-sm">✨</span>
              </div>
              <h3 className="text-lg font-bold ">
                {item.typeName.toUpperCase() ?? "Produk"}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {item.products.map((p) => (
                <div
                  key={p.productCode}
                  onClick={() => {
                    setSelectedProduct(p);
                    setProductCode(p.productCode);
                    setProductPrice(p.productPrice);
                    setFormData({
                      productCode: p.productCode,
                    });
                  }}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-gradient-to-br from-background to-background/80 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:border-primary/60 hover:shadow-2xl hover:-translate-y-1 ${
                    selectedProduct?.productCode === p.productCode
                      ? "border-primary ring-2 ring-primary"
                      : "border-border/50"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500" />

                  <div className="relative flex flex-col justify-between p-4 h-full ">
                    <div className="flex items-center gap-3 ">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-primary truncate group-hover:text-primary/90 transition-colors">
                          {p.productName}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-muted-foreground ">
                            {FormatCurrency(p.productPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
