"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductData } from "@/types/product";
import Link from "next/link";
import { useGetAllProduct } from "@/lib/api/products/product.query";
import { HandleOtherProduct } from "@/components/dialog/product/HandleOtherProduct";

export function ProductsSectionDashboard() {
  const { data, isLoading, error } = useGetAllProduct();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        Error loading products: {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 p-6">No products found</div>
    );
  }
  console.log(data)

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((product: ProductData) => (
        <Card key={product.id} className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <p className="place-content-center">{product.name}</p>
              <HandleOtherProduct
                initialData={{
                  categoryId: product.categoryId,
                  description: product.description,
                  name: product.name,
                  price: product.price,
                  sub_title : product.sub_title,
                  id: product.id,
                }}
              />
            </CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Price:</span>
                <span>{product.price} IDR</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">SKU:</span>
                <span>{product.sku}</span>
              </div>
                <Link href={`/dashboard/product/${product.id}`}>
                  <Button className="w-full mt-4">More Variants</Button>
                </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
