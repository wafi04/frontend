import { HeaderOrder } from "./headerOrder";

export function VoucherOrder() {
  return (
    <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[7.5rem]">
      <HeaderOrder id={5} subName="Kode Promo" />
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-x-4">
            <div className="flex-1">
              <div className="flex w-full flex-col items-start">
                <input
                  className="relative block h-9 w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                  type="text"
                  placeholder="Ketik Kode Promo Kamu"
                  name="promo.code"
                />
              </div>
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap transition-all  shadow-sm text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-lg px-4 bg-button-gradient-theme bg-size-200 bg-pos-0 duration-500 before:animate-rainbow hover:bg-pos-100"
              type="button"
            >
              Gunakan
            </button>
          </div>
          <div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap transition-all shadow-sm text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-lg px-4 bg-button-gradient-theme bg-size-200 bg-pos-0 duration-500 before:animate-rainbow hover:bg-pos-100 gap-2 pl-3"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-ticket-percent h-4 w-4"
              >
                <path d="M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                <path d="M9 9h.01"></path>
                <path d="m15 9-6 6"></path>
                <path d="M15 15h.01"></path>
              </svg>
              <span>Pakai Promo Yang Tersedia</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
