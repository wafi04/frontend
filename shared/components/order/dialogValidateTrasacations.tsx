"use client";

import { SVG } from "@/utils/svg";
import { useOrder } from "@/shared/hooks/formOrder";
import { X } from "lucide-react";
import { FormatCurrency } from "@/utils/format";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface DialogValidateTransactionsProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData?: {
    status: string;
    referenceID: string;
    productName: string;
    fee: number;
    methodName: string;
    no_tujuan: string;
    nickname: string;
  };
}

export function DialogValidateTransactions({
  isOpen,
  onClose,
  transactionData,
}: DialogValidateTransactionsProps) {
  const { push } = useRouter();
  const confettiRef = useRef<HTMLDivElement>(null);
  const {
    gameId,
    serverId,
    nickname,
    selectedMethod,
    productPrice,
    calculation,
  } = useOrder();

  useEffect(() => {
    if (isOpen && transactionData?.status === "SUCCESS") {
      const timer = setTimeout(() => {
        createConfetti();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen, transactionData?.status]);

  const createConfetti = () => {
    if (!confettiRef.current) return;

    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
    ];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-piece";
      confetti.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
        animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
        transform: rotate(${Math.random() * 360}deg);
        z-index: 1000;
      `;

      confettiRef.current.appendChild(confetti);

      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 5000);
    }
  };

  if (!isOpen) return null;

  const displayData = {
    username: transactionData?.nickname || nickname || "-",
    id: gameId || "-",
    server: serverId || "-",
    product: transactionData?.productName,
    payment: selectedMethod?.name || transactionData?.methodName || "-",
    referenceID: transactionData?.referenceID || "-",
    status: transactionData?.status || "PENDING",
    fee: transactionData?.fee || calculation?.methodFee || 0,
    total: calculation?.totalAmount || productPrice || 0,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        ref={confettiRef}
        className="fixed inset-0 pointer-events-none z-[60]"
        style={{
          overflow: "hidden",
        }}
      />

      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg border border-border/25 bg-background px-4 pb-4 pt-5 text-left text-foreground shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 opacity-100 translate-y-0 sm:scale-100">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 hover:bg-secondary/80 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div>
            <div className="-my-8 flex justify-center">
              <SVG />
            </div>
          </div>

          <div className="text-center text-sm">
            <h3 className="text-lg font-semibold leading-6 text-foreground">
              {transactionData ? "Pesanan Berhasil" : "Buat Pesanan"}
            </h3>
            <p className="pt-1">
              {transactionData
                ? "Pesanan Anda telah berhasil dibuat. Berikut detail transaksi:"
                : "Pastikan data akun Kamu dan produk yang Kamu pilih valid dan sesuai."}
            </p>

            <div className="mt-4">
              <div className="my-4 grid grid-cols-3 gap-3 rounded-md bg-secondary/50 p-4 text-left text-sm text-secondary-foreground">
                {transactionData && (
                  <>
                    <div className="line-clamp-1">Reference ID</div>
                    <div className="col-span-2 truncate font-mono text-xs">
                      {displayData.referenceID}
                    </div>

                    <div className="line-clamp-1">Status</div>
                    <div className="col-span-2 truncate">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          displayData.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : displayData.status === "SUCCESS"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {displayData.status}
                      </span>
                    </div>
                  </>
                )}

                <div className="line-clamp-1">Username</div>
                <div className="col-span-2 truncate">
                  {displayData.username}
                </div>

                <div className="line-clamp-1">ID</div>
                <div className="col-span-2 truncate">{displayData.id}</div>

                {displayData.server && displayData.server !== "-" && (
                  <>
                    <div className="line-clamp-1">Server</div>
                    <div className="col-span-2 truncate">
                      {displayData.server}
                    </div>
                  </>
                )}

                <div className="line-clamp-1">Product</div>
                <div className="col-span-2 truncate">{displayData.product}</div>

                <div className="line-clamp-1">Payment</div>
                <div className="col-span-2 truncate">{displayData.payment}</div>

                {transactionData && (
                  <>
                    <div className="line-clamp-1">Fee</div>
                    <div className="col-span-2 truncate">
                      {FormatCurrency(displayData.fee)}
                    </div>

                    <div className="line-clamp-1 font-semibold">Total</div>
                    <div className="col-span-2 truncate font-semibold">
                      {FormatCurrency(displayData.total)}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-3 sm:flex-row-reverse">
              {transactionData && (
                <>
                  <Button className="w-full" type="button" onClick={onClose}>
                    Tutup
                  </Button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground shadow-sm hover:bg-secondary/80 "
                    onClick={() => {
                      push(`/invoice?refid=${transactionData.referenceID}`);
                    }}
                  >
                    Bayar Sekarang
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .confetti-piece {
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  );
}
