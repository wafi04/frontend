import { ButtonDialogVariants } from "@/components/dialog/variants/ButtonDialogVariants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProductData } from "@/types/product";
import { FormatPrice } from "@/utils/Format";
import Image from "next/image";

export function ProductInfo({ product }: { product: ProductData }) {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {product?.variants?.map((variant) => (
        <Card
          key={variant.id}
          className="shadow-lg border border-gray-300  relative rounded-xl overflow-hidden bg-white"
        >
          {variant.images?.length > 0 && (
            <div className="relative w-full h-48">
              <Image
                src={variant.images.find((img) => img.isMain)?.url || variant.images[0].url}
                alt={variant.color}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
          )}
          <CardHeader className="p-4">
            <h1 className="text-lg font-semibold text-gray-900">{product.name}</h1>
            <h3 className="text-xs text-gray-500">SKU: {product.sku}</h3>
            <h3 className="text-sm font-medium text-gray-800">
              Price: {FormatPrice(product.price)}
            </h3>
          </CardHeader>
          <CardContent className="p-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-md font-semibold text-gray-800">{variant.color}</h3>
              <h3 className="text-sm text-gray-600">SKU: {variant.sku}</h3>
              <h3 className="text-sm text-gray-600">Stock: {variant.stock}</h3>
            </div>
            <ButtonDialogVariants variantId={variant.id} data={variant}/>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
