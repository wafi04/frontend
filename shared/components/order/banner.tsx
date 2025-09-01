import Image from "next/image";

export function BannerOrder({ image }: { image?: string }) {
  return (
    <div className="relative">
      <Image
        alt="Mobile Legends"
        src={image || "/bgorder.png"}
        width={1920}
        height={720}
        className="min-h-56 w-full bg-muted object-cover object-center lg:object-contain"
      />
    </div>
  );
}
