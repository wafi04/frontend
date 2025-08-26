import Image from "next/image";

export function Banner({ image }: { image?: string }) {
  return (
    <div className="relative">
      <Image
        alt="Mobile Legends"
        src={
          image ||
          "https://client-cdn.bangjeff.com/veinstore.id/product/BANNER-5%20(2).jpg"
        }
        priority
        width={1920}
        height={720}
        className="min-h-56 w-full bg-muted object-cover object-center lg:object-contain"
      />
    </div>
  );
}
