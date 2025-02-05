"use client";
import React, { useState } from "react";
import { LayoutsWithHeaderAndFooter } from "@/providers/NavbarAndFooter";
import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FormatPrice } from "@/utils/Format";
import { useCart } from "@/hooks/useCart";
import { VariantsData } from "@/types/variants";
import { useGetProductById } from "@/lib/api/products/product.query";
import { LeftSide } from "./left-side";
import { ModalAddToCart } from "@/components/dialog/cart/DialogCart";

export function ProductDetailsPage({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetProductById(id);
  const { setPrice, setSize, size } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<
    VariantsData | undefined
  >();

  if (isLoading || data === undefined) {
    return (
      <div className="min-h-screen flex w-full justify-center items-center">
        <Loader2 className="animate-spin size-10" />
      </div>
    );
  }

  console.log(data);

  const handleAddToCart = () => {
    setPrice(data.price);
    setIsOpen(true);
  };

  const mainImage =
    selectedVariant?.images[0]?.url || data.variants[0].images[0].url;

  console.log(data);

  return (
    <>
      <LayoutsWithHeaderAndFooter className="mt-[65px]">
        <section className="container mx-auto px-4 py-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {/* Left Side: Main Image */}
            <div className="h-full">
              <LeftSide
                name={data.name}
                image={mainImage}
                images={selectedVariant?.images || []}
              />
            </div>

            <div className="space-y-6 overflow-y-auto h-full pr-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {data.name}
                </h1>
                <p className="mt-2 text-lg text-gray-600">{data.sub_title}</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {FormatPrice(data.price)}
                </h2>
                <p className="mt-2 text-sm text-gray-500">SKU: {data.sku}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Available Colors
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {data.variants?.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`relative rounded-lg overflow-hidden border-2 ${
                        selectedVariant?.id === variant.id
                          ? "border-blue-500"
                          : "border-transparent"
                      } hover:border-gray-300 transition-all duration-200`}>
                      <Image
                        src={variant.images[0].url}
                        alt={variant.color}
                        width={100}
                        height={100}
                        className="w-full aspect-square object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <div className="flex space-x-2 mt-2">
                  {selectedVariant?.inventory.map((inv) => (
                    <Button
                      key={inv.id}
                      disabled={inv.available_stock === 0}
                      onClick={() => setSize(inv.size)}
                      className={`px-4 py-2 rounded-lg border ${
                        size === inv.size
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-900 border-gray-200"
                      } transition-all  hover:bg-gray-200 hover:text-black duration-200`}>
                      {inv.size} {inv.available_stock === 0 && "(Out of Stock)"}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Product Description */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Sticky Add to Cart Button */}
              <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
                <Button
                  className="w-full rounded-full bg-black text-white hover:bg-gray-700 transition-all duration-300"
                  onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </section>
      </LayoutsWithHeaderAndFooter>
      {isOpen && (
        <ModalAddToCart
          isOpen={isOpen}
          product={data}
          selectedVariant={selectedVariant}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}

export default ProductDetailsPage;
