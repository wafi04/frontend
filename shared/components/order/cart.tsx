import { useProductAndMethod } from "@/shared/hooks/useSelectProductAndMethod";
import { FormatCurrency } from "@/utils/format";
import Image from "next/image";

interface CartProps {
  img?: string;
  productName?: string;
  productDescription?: string;
}

export function Cart({ img, productName, productDescription }: CartProps) {
  const { productPrice } = useProductAndMethod();



  return (
    <div className="hidden space-y-4 lg:block">
      <div className="rounded-lg border border-dashed bg-secondary text-sm text-secondary-foreground">
        <div className="flex w-full flex-col gap-2 p-4">
          {productPrice === 0 ? (
            <div className="flex h-[98px] items-center justify-center text-center">
              Belum ada item produk yang dipilih.
            </div>
          ) : (
            <>
            <div className="flex flex-col gap-4">
              {/* Product Info */}
              <div className="flex items-center gap-4 pb-2">
                <div className="aspect-square h-16 w-16 overflow-hidden rounded-lg">
                  {img ? (
                      <Image 
                      alt="product" 
                      src={img} 
                      width={64} 
                      height={64}
                      className="h-full w-full object-cover"
                      />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">
                    {productName || "Mobile Legends"}
                  </div>
                  <div className="mt-1 text-muted-foreground">
                    {productDescription || "2x Weekly Diamond Pass"}
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex items-center justify-between border-t pt-2">
                <div className="text-sm font-medium">Harga</div>
                <div className="text-sm font-semibold">
                  {FormatCurrency(productPrice)}
                </div>
              </div>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-1"></div>
            <div className="flex items-center justify-between gap-2"><div className="text-lg font-bold">
                Total Pembayaran</div><div className="text-lg/6 font-semibold text-primary">
                </div></div>
                <button className="inline-flex items-center justify-center whitespace-nowrap transition-all rounded-lg shadow-sm text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-lg px-4 bg-button-gradient-theme bg-size-200 bg-pos-0 duration-500 before:animate-rainbow hover:bg-pos-100 w-full gap-2" type="submit"><svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5209 6.87109H8.47891C5.67599 6.87109 3.91895 8.8558 3.91895 11.6636V16.206C3.91895 19.0148 5.66724 20.9985 8.47891 20.9985H16.5199C19.3316 20.9985 21.0818 19.0148 21.0818 16.206V11.6636C21.0818 8.8558 19.3316 6.87109 16.5209 6.87109Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path opacity="0.4" d="M9.38477 11.1445C9.45871 11.8684 9.79338 12.5173 10.275 13.0096C10.8509 13.5748 11.639 13.928 12.5019 13.928C14.116 13.928 15.443 12.7119 15.6191 11.1445" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path opacity="0.4" d="M16.3702 6.87115C16.3702 4.7337 14.6375 3 12.4991 3C10.3616 3 8.62891 4.7337 8.62891 6.87115" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Pesan Sekarang!</span></button>
          </>
          )}
        </div>
      </div>
    </div>
  );
}