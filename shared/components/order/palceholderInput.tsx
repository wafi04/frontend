import { useOrder } from "@/shared/hooks/formOrder";

export function PlaceholderInput() {
  const { form } = useOrder();
  return (
    <>
      <div className="flex items-center overflow-hidden rounded-t-xl bg-card">
        <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">
          1
        </div>
        <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">
          Masukkan Data Akun
        </h2>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* ID Input */}
            <div>
              <div className="flex items-center gap-2 pb-2">
                <label
                  htmlFor="id"
                  className="block text-xs font-medium text-foreground"
                >
                  ID
                </label>
                <div className="cursor-pointer">
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
                    className="lucide lucide-info h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
              </div>
              <div className="relative flex w-full items-center gap-2">
                <div className="flex w-full flex-col items-start">
                  <input
                    className="relative block h-9 w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                    type="text"
                    id="id"
                    min="0"
                    placeholder="Masukkan ID"
                    autoComplete="id"
                    {...form.register("gameId", {
                      required: "Game ID wajib diisi",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Game ID harus berupa angka",
                      },
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Server Input */}
            <div>
              <div className="flex items-center gap-2 pb-2">
                <label
                  htmlFor="server"
                  className="block text-xs font-medium text-foreground"
                >
                  Server
                </label>
              </div>
              <div className="relative flex w-full items-center gap-2">
                <div className="flex w-full flex-col items-start">
                  <input
                    className="relative block h-9 w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                    type="text"
                    id="server"
                    min="0"
                    placeholder="Masukkan Server"
                    autoComplete="server"
                    {...form.register("serverId", {
                      required: "Server Id wajib diisi",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
