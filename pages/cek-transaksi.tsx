import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { useRouter } from "next/navigation";

export default function InvoiceCheck() {
  const { push } = useRouter();
  return (
    <>
      <Navbar />
      <main className="relative bg-background">
        <div className="m-4 rounded-3xl bg-primary/5">
          <div className="container flex flex-col items-center justify-center gap-3 pb-4 pt-12 text-center md:py-32">
            <h1 className="text-3xl font-bold lg:text-4xl">
              Cek Invoice Kamu dengan Mudah dan Cepat
            </h1>
            <p className="text-sm font-medium md:text-base">
              Lihat detail pembelian kamu menggunakan nomor Invoice.
            </p>
            <form
              className="mt-8 w-full max-w-xl rounded-3xl bg-background p-6 text-left shadow-md"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const invoice = data.get("invoice") as string;
                if (invoice) push(`/invoice?refid=${invoice}`);
              }}
            >
              <h3 className="text-sm font-semibold">
                Cari detail pembelian kamu disini
              </h3>
              <div className="py-4">
                <div className="relative">
                  <div className="flex w-full flex-col items-start">
                    <input
                      className="relative block  w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75 h-10"
                      type="text"
                      placeholder="Masukkan nomor Invoice Kamu (Contoh: TXNXXXXXXXXXXXXXX)"
                      name="invoice"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 z-30 -translate-y-1/2 bg-input"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.8233 6.28561H10.1766C9.42742 6.28561 8.82031 5.67849 8.82031 4.92933V4.35627C8.82031 3.60711 9.42742 3 10.1766 3H14.8233C15.5725 3 16.1796 3.60711 16.1796 4.35627V4.92933C16.1796 5.67849 15.5725 6.28561 14.8233 6.28561Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        opacity="0.4"
                        d="M16.1793 4.59375C18.2526 4.59375 19.9338 6.27498 19.9338 8.34831V17.2458C19.9338 19.3191 18.2526 21.0004 16.1793 21.0004H8.81999C6.74666 21.0004 5.06543 19.3191 5.06543 17.2458V8.34831C5.06543 6.27498 6.74666 4.59375 8.81999 4.59375"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M14.7043 13.3918H10.2949M12.5002 15.5968V11.1875"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap transition-all rounded-lg shadow-sm text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 bg-button-gradient-theme bg-size-200 bg-pos-0 duration-500 before:animate-rainbow hover:bg-pos-100 w-full gap-2 pl-2 pr-5"
              >
                Cari Invoice
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
