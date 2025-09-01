"use client";
import { useGetMethodByType } from "@/features/methods/hooks/api";
import { HeaderOrder } from "@/features/order/components/headerOrder";
import Image from "next/image";
import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrder } from "@/shared/hooks/formOrder";
import { FormatCurrency } from "@/utils/format";
import { useProductAndMethod } from "@/shared/hooks/useSelectProductAndMethod";
import { toast } from "sonner";

export function MethodSection() {
  const { data } = useGetMethodByType();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const { form } = useOrder();
  const { productPrice, selectedMethod, setSelectedMethod } =
    useProductAndMethod();

  const calcLocal = (fee: number, feeType: "fixed" | "percentage"): number => {
    if (feeType === "percentage") {
      const percentage = fee / 10000;
      return Math.round(productPrice * (percentage / 100));
    }
    return fee;
  };

  const toggleGroup = (groupType: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupType)
        ? prev.filter((type) => type !== groupType)
        : [...prev, groupType]
    );
  };

  const isGroupExpanded = (groupType: string) =>
    expandedGroups.includes(groupType);

  return (
    <section className="relative scroll-mt-20 rounded-xl shadow-2xl md:scroll-mt-[7.5rem]">
      <HeaderOrder id={3} subName="Pilih Pembayaran" />
      <div className="space-y-3 pt-5">
        {data?.data.map((group) => (
          <div
            key={group.type}
            className="rounded-lg border border-slate-700 bg-slate-800/40 backdrop-blur-md overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={(e) => {
                if (productPrice <= 0) {
                  toast.error("Pilih Product TFFerlebih Dahulu");
                }
                e.preventDefault();
                e.stopPropagation();
                toggleGroup(group.type);
              }}
              className="flex w-full items-center justify-between transition-colors hover:bg-slate-700/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start gap-2 w-full">
                  <div className="w-full justify-between flex bg-primary border-b py-2 px-3">
                    <h3 className="text-sm font-semibold ">
                      {group.type.toUpperCase()}
                    </h3>
                    {isGroupExpanded(group.type) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>

                  {!isGroupExpanded(group.type) && (
                    <div className="flex gap-3 justify-end w-full p-4 items-end">
                      {group.methods.slice(0, 4).map((method) => (
                        <div
                          key={method.id}
                          className="relative h-6 w-20 flex-shrink-0  rounded-md p-0.5"
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
                </div>
              </div>
            </button>

            {/* Expanded */}
            {isGroupExpanded(group.type) && (
              <div className="border-t border-slate-700 bg-slate-900/60 p-4">
                <div className="grid gap-3 sm:grid-cols-2 ">
                  {group.methods.map((method) => (
                    <div key={method.id}>
                      <button
                        onClick={() => {
                          setSelectedMethod({
                            code: method.code,
                            fee: method.fee,
                            feeType: method.feeType as "fixed" | "percentage",
                            id: method.id,
                            name: method.name,
                          });
                          form.setValue("methodCode", method.code);
                          form.setValue("methodFee", method.fee);
                          form.setValue(
                            "methodFeeType",
                            method.feeType as string
                          );
                        }}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-lg border p-3 transition-all",
                          selectedMethod?.id === method.id
                            ? "border-primary bg-primary/20"
                            : "border-slate-600 bg-slate-800 hover:border-primary hover:bg-primary/10"
                        )}
                      >
                        {/* Kiri: logo + nama */}
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0 rounded-md">
                            <Image
                              src={method.image}
                              alt={method.name}
                              width={50}
                              height={50}
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {method.name}
                          </span>
                        </div>

                        {/* Kanan: fee & total */}
                        {productPrice && productPrice > 1 && (
                          <div className="flex flex-col items-end text-sm ">
                            <span>
                              Fee:{" "}
                              {FormatCurrency(
                                calcLocal(
                                  method.fee as number,
                                  method?.feeType as "fixed" | "percentage"
                                )
                              )}
                            </span>
                            <span className="font-medium ">
                              Total:{" "}
                              {FormatCurrency(
                                productPrice +
                                  calcLocal(
                                    method.fee as number,
                                    method?.feeType as "fixed" | "percentage"
                                  )
                              )}
                            </span>
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
