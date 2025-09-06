import { useOrder } from "@/shared/hooks/formOrder";

export function PlaceholderInput() {
  // Destructure semua yang diperlukan dari useOrder
  const {
    gameId, // individual field
    serverId, // individual field
    nickname, // individual field
    voucherCode, // individual field
    setFormData,
    errors,
  } = useOrder();

  // Atau jika useOrder mengembalikan formData sebagai object:
  // const { formData, setFormData, errors } = useOrder();

  const handleInputChange = (field: string, value: string) => {
    setFormData({ [field]: value });
  };

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

      <div className="p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* ID Input */}
            <div>
              <div className="flex items-center gap-2 pb-2">
                <label
                  htmlFor="gameId"
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
                    className={`relative block h-9 w-full appearance-none rounded-lg border px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-75 ${
                      errors.gameId
                        ? "border-destructive focus:border-destructive focus:ring-destructive bg-destructive/5"
                        : "border-border bg-input focus:border-primary focus:ring-primary"
                    }`}
                    type="text"
                    id="gameId"
                    placeholder="Masukkan ID"
                    autoComplete="off"
                    value={gameId || ""} // Gunakan gameId langsung
                    onChange={(e) =>
                      handleInputChange("gameId", e.target.value)
                    }
                  />
                  {errors.gameId && (
                    <span className="mt-1 text-xs text-destructive">
                      {errors.gameId}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Server Input */}
            <div>
              <div className="flex items-center gap-2 pb-2">
                <label
                  htmlFor="serverId"
                  className="block text-xs font-medium text-foreground"
                >
                  Server
                </label>
              </div>
              <div className="relative flex w-full items-center gap-2">
                <div className="flex w-full flex-col items-start">
                  <input
                    className={`relative block h-9 w-full appearance-none rounded-lg border px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-75 ${
                      errors.serverId
                        ? "border-destructive focus:border-destructive focus:ring-destructive bg-destructive/5"
                        : "border-border bg-input focus:border-primary focus:ring-primary"
                    }`}
                    type="text"
                    id="serverId"
                    placeholder="Masukkan Server"
                    autoComplete="off"
                    value={serverId || ""} // Gunakan serverId langsung
                    onChange={(e) =>
                      handleInputChange("serverId", e.target.value)
                    }
                  />
                  {errors.serverId && (
                    <span className="mt-1 text-xs text-destructive">
                      {errors.serverId}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Nickname Input */}
          <div>
            <div className="flex items-center gap-2 pb-2">
              <label
                htmlFor="nickname"
                className="block text-xs font-medium text-foreground"
              >
                Nickname (Opsional)
              </label>
            </div>
            <div className="relative flex w-full items-center gap-2">
              <div className="flex w-full flex-col items-start">
                <input
                  className="relative block h-9 w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                  type="text"
                  id="nickname"
                  placeholder="Masukkan Nickname (opsional)"
                  autoComplete="off"
                  value={nickname || ""} // Gunakan nickname langsung
                  onChange={(e) =>
                    handleInputChange("nickname", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Voucher Code Input */}
          <div>
            <div className="flex items-center gap-2 pb-2">
              <label
                htmlFor="voucherCode"
                className="block text-xs font-medium text-foreground"
              >
                Kode Voucher (Opsional)
              </label>
            </div>
            <div className="relative flex w-full items-center gap-2">
              <div className="flex w-full flex-col items-start">
                <input
                  className="relative block h-9 w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                  type="text"
                  id="voucherCode"
                  placeholder="Masukkan kode voucher (DISKON10, DISKON20)"
                  autoComplete="off"
                  value={voucherCode || ""} // Gunakan voucherCode langsung
                  onChange={(e) =>
                    handleInputChange("voucherCode", e.target.value)
                  }
                />
                {voucherCode && ( // Gunakan voucherCode langsung
                  <span className="mt-1 text-xs text-muted-foreground">
                    Kode voucher: {voucherCode.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Untuk debug/testing, bisa tambahkan ini:
export function DebugValues() {
  const { gameId, serverId, nickname, voucherCode } = useOrder();

  console.log("Current form values:", {
    gameId,
    serverId,
    nickname,
    voucherCode,
  });

  return null; // Component ini hanya untuk debug
}
