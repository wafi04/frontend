"use client";
import { useGetMethodByType } from "@/features/methods/hooks/api";
import { HeaderOrder } from "@/features/order/components/headerOrder";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrder } from "@/shared/hooks/formOrder";
import { FormatCurrency } from "@/utils/format";
import { toast } from "sonner";
import { calculateFee } from "@/utils/calculateFee";

export function MethodSection() {
  const { data } = useGetMethodByType();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const { productPrice, selectedMethod, setSelectedMethod } = useOrder();

  const handleGroupToggle = (groupType: string) => {
    if (productPrice <= 0) {
      toast.error("Pilih Product Terlebih Dahulu");
      return;
    }
    setExpandedGroup(expandedGroup === groupType ? null : groupType);
  };

  const handleMethodSelect = (method: any) => {
    // Calculate fee properly
    const feeData = {
      fixed: Number(method.fee_amount) || 0,
      percentage: Number(method.fee_percentage) || 0,
    };

    const calculatedFee = calculateFee(
      productPrice,
      feeData,
      method.calculation_type as "fixed" | "percentage" | "hybrid"
    );

    setSelectedMethod({
      code: method.code,
      fee: calculatedFee,
      feeType: method.calculation_type,
      id: method.id,
      name: method.name,
    });
  };

  return (
    <section className="relative scroll-mt-20 rounded-xl shadow-2xl md:scroll-mt-[7.5rem]">
      <HeaderOrder id={3} subName="Pilih Pembayaran" />

      <div className="space-y-3 pt-5">
        {data?.data?.map((group) => (
          <div
            key={group.type}
            className="rounded-lg border border-slate-700 bg-slate-800/40 backdrop-blur-md overflow-hidden"
          >
            {/* Header dengan preview metode */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleGroupToggle(group.type);
              }}
              className="flex w-full items-center justify-between transition-colors hover:bg-slate-700/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-full justify-between flex bg-primary border-b py-2 px-3">
                  <h3 className="text-sm font-semibold">
                    {group.type.toUpperCase()}
                  </h3>
                  {expandedGroup === group.type ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </div>
            </button>

            {/* Preview methods (ketika collapsed) */}
            {expandedGroup !== group.type && (
              <div className="flex gap-3 justify-end w-full p-4 items-end">
                {group.methods?.slice(0, 4).map((method) => (
                  <div
                    key={method.id}
                    className="relative h-6 w-20 flex-shrink-0 rounded-md"
                  >
                    <Image
                      src={method.image}
                      alt={method.name}
                      fill
                      className="object-fit"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Expanded methods */}
            {expandedGroup === group.type && (
              <div className="border-t border-slate-700 bg-slate-900/60 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {group.methods?.map((method) => {
                  

                    // Handle empty calculation_type
                    let calculationType = method.calculation_type;
                    if (!calculationType || calculationType === "" as string) {
                      if (
                        (method.fee_amount === 0 || !method.fee_amount) &&
                        (method.fee_percentage === 0 || !method.fee_percentage)
                      ) {
                        calculationType = "fixed"; 
                      } else if (method.fee_amount > 0) {
                        calculationType = "fixed";
                      } else if (method.fee_percentage > 0) {
                        calculationType = "percentage";
                      } else {
                        calculationType = "fixed";
                      }
                    }

                    const feeData = {
                      fixed: Number(method.fee_amount) || 0,
                      percentage: Number(method.fee_percentage) || 0,
                    };

                    const fee = calculateFee(
                      productPrice,
                      feeData,
                      calculationType as "fixed" | "percentage" | "hybrid"
                    );

                    const total = productPrice + fee;
                    const isSelected = selectedMethod?.id === method.id

                    return (
                      <button
                        key={method.id}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleMethodSelect({
                            ...method,
                            calculation_type: calculationType,
                          });
                        }}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-lg border p-3 transition-all",
                          isSelected
                            ? "border-primary bg-primary/20"
                            : "border-slate-600 bg-slate-800 hover:border-primary hover:bg-primary/10"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={method.image}
                            alt={method.name}
                            width={50}
                            height={50}
                            className="object-cover rounded-md"
                          />
                          <span className="text-sm font-medium">
                            {method.name}
                          </span>
                        </div>

                        {productPrice > 0 && (
                          <div className="flex flex-col items-end text-sm space-y-1">
                            <div className="flex items-center gap-1">
                              <span className="text-slate-400">Fee:</span>
                              <span
                                className={`font-medium ${
                                  fee === 0
                                    ? "text-green-500"
                                    : "text-orange-400"
                                }`}
                              >
                                {fee === 0 ? "Gratis" : FormatCurrency(fee)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-slate-400">Total:</span>
                              <span className="font-semibold text-primary">
                                {FormatCurrency(total)}
                              </span>
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
