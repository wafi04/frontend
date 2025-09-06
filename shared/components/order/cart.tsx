import { useOrder } from "@/shared/hooks/formOrder";
import { FormatCurrency } from "@/utils/format";
import Image from "next/image";
import { DialogValidateTransactions } from "./dialogValidateTrasacations";

interface CartProps {
  img?: string;
  productName?: string;
  productDescription?: string;
}

export function Cart({ img, productName, productDescription }: CartProps) {
  const {
    productPrice,
    selectedMethod,
    calculation,
    gameId,
    productCode,
    isSubmitting,
    submitOrder,
    showDialog,
    transactionResult,
    closeDialog,
    errors,
  } = useOrder();

  const handleSubmit = () => {
    submitOrder();
  };

  const canSubmit =
    gameId && productCode?.trim() && selectedMethod?.code && productPrice > 0;

  console.log("Can submit check:", {
    gameId: !!gameId,
    productCode: !!productCode?.trim(),
    methodCode: !!selectedMethod?.code,
    productPrice: productPrice > 0,
    canSubmit,
  });

  return (
    <>
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

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-t pt-2">
                      <div className="text-sm font-medium">Harga Produk</div>
                      <div className="text-sm font-semibold">
                        {FormatCurrency(calculation.productPrice)}
                      </div>
                    </div>

                    {calculation.methodFee > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Biaya Admin ({selectedMethod?.name})
                        </div>
                        <div className="text-sm">
                          {FormatCurrency(calculation.methodFee)}
                        </div>
                      </div>
                    )}

                    {calculation.voucherDiscount > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-green-600">
                          Diskon Voucher
                        </div>
                        <div className="text-sm text-green-600">
                          -{FormatCurrency(calculation.voucherDiscount)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  data-orientation="horizontal"
                  role="none"
                  className="shrink-0 bg-border h-[1px] w-full my-1"
                ></div>

                <div className="flex items-center justify-between gap-2">
                  <div className="text-lg font-bold">Total Pembayaran</div>
                  <div className="text-lg/6 font-semibold text-primary">
                    {FormatCurrency(calculation.totalAmount)}
                  </div>
                </div>

                {/* Root Error Display */}
                {errors.root && (
                  <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                    {errors.root}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className="inline-flex items-center justify-center whitespace-nowrap transition-all shadow-sm text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-lg px-4 bg-button-gradient-theme bg-size-200 bg-pos-0 duration-500 before:animate-rainbow hover:bg-pos-100 w-full gap-2"
                  type="button"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <span>Pesan Sekarang!</span>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Dialog muncul SETELAH transaksi berhasil */}
        {transactionResult && showDialog && (
          <DialogValidateTransactions
            isOpen={showDialog}
            onClose={closeDialog}
            transactionData={{
              ...transactionResult,
            }}
          />
        )}
      </div>
    </>
  );
}