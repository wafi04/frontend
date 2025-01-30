import {
  ProductWithCategoryAndVariants,
  ProductWithVariants,
  VariantsData,
} from "@/types/products";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export function SearchModal({
  product,
  isLoading,
}: {
  product: ProductWithCategoryAndVariants;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="size-20 text-blue-500 animate-spin" />
      </div>
    );
  }
  console.log(product);
  return (
    <div className="space-y-2">
      <a href={`/p/${product.id}`} className="block">
        <Image
          src={product.images[0]}
          width={500}
          height={500}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="mt-2">
          <h2 className="font-bebas text-xl truncate">{product.name}</h2>
          <h3 className="text-gray-500 truncate">{product.category?.name}</h3>
        </div>
      </a>
    </div>
  );
}
