import { Card, CardContent } from "@/components/ui/card";
import { VariantImage } from "@/types/variants";
import Image from "next/image";
import { useState } from "react";

export function LeftSide({
  image,
  name,
  images,
}: {
  image: string;
  name: string;
  images: VariantImage[] | undefined;
}) {
  const [mainImage, setMainImage] = useState(image);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      {/* Thumbnail Images */}
      <div className="flex flex-row md:flex-col gap-2 order-2 md:order-1 md:h-full md:justify-start">
        {images?.map((img, index) => (
          <Card
            key={index}
            className="overflow-hidden bg-gray-50 w-14 shrink-0 cursor-pointer rounded-none md:h-14"
            onMouseEnter={() => setMainImage(img.url)}
            onMouseLeave={() => setMainImage(image)}
            onClick={() => setMainImage(img.url)}>
            <CardContent className="p-0 h-full">
              <Image
                src={img.url}
                alt={`${name} - Image ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover hover:opacity-80 transition-opacity"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Image Container */}
      <div className="flex-1 order-1 md:order-2 h-full">
        <Card className="overflow-hidden bg-gray-50">
          <CardContent className="p-0 h-full">
            <Image
              src={mainImage}
              alt={name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
              priority
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
