import Image from "next/image";
interface HeaderProuctProps {
  image?: string;
  name: string;
  subName: string;
}

export function HeaderProuct({ name, subName, image }: HeaderProuctProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Thumbnail produk */}
      <div className="flex items-start gap-4">
        <div className="product-thumbnail-container relative -top-16 md:-top-28">
          <Image
            alt="ML X Borg"
            src={
              image ||
              "https://client-cdn.bangjeff.com/veinstore.id/product/mlxborgv2.webp"
            }
            width={300}
            height={300}
            className="z-20 -mb-14 aspect-square w-32 rounded-2xl object-cover shadow-2xl md:-mb-20 md:w-60"
          />
        </div>
      </div>

      {/* Info produk */}
      <div className="py-4 sm:py-0">
        <h1
          id="main-title"
          className="text-xs font-bold uppercase leading-7 tracking-wider sm:text-lg"
        >
          {name}
        </h1>
        <p className="text-xs font-medium sm:text-base/6">{subName}</p>

        {/* Badge info (desktop) */}
        <div className="mt-4 hidden gap-2 text-xs md:flex">
          <div className="flex items-center gap-2">
            <Image
              alt="Proses Cepat"
              src="https://www.veinstore.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flightning.f56faa6d.gif&w=256&q=75"
              width={32}
              height={32}
              className="size-8"
            />
            <span className="text-xs/7 font-medium">Proses Cepat</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              alt="Layanan Chat 24/7"
              src="https://www.veinstore.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontact-support.cbc8679f.gif&w=256&q=75"
              width={32}
              height={32}
              className="size-8"
            />
            <span className="text-xs/7 font-medium">Layanan Chat 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              alt="Pembayaran Aman!"
              src="https://www.veinstore.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecure.d47b2cba.gif&w=256&q=75"
              width={28}
              height={28}
              className="ml-1.5 mr-0.5 size-5"
            />
            <span className="text-xs/7 font-medium">Pembayaran Aman!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
