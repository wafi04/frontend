import {
  MethodGrubResponse,
  MethodData,
} from "@/features/dashboard/methods/types/method";
import { API_RESPONSE } from "@/shared/types/response";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  ErrorMethods,
  LoadingMethods,
} from "@/features/dashboard/methods/component/loadingMethod";
import Image from "next/image";
import { useGetMethodsByGroub } from "@/features/dashboard/methods/hooks/api";
import { HeaderOrder } from "./headerOrder";
import { FormatCurrency } from "@/utils/format";

export function MethodSection() {
  const { data, error, isLoading } = useGetMethodsByGroub();
  const [selectedMethod, setSelectedMethod] = useState<MethodData | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (isLoading) {
    return <LoadingMethods />;
  }

  if (error) {
    return <ErrorMethods />;
  }

  const paymentGroups = data || [];

  // Format group name untuk display
  const formatGroupName = (groupName: string) => {
    const nameMap: Record<string, string> = {
      "virtual-account": "Virtual Account",
      ewallet: "E-Wallet",
      qris: "QRIS",
      cstore: "Convenience Store",
      bank_transfer: "Bank Transfer",
    };
    return nameMap[groupName] || groupName.replace("-", " ").replace(/_/g, " ");
  };

  // Filter groups berdasarkan pilihan dropdown
  const filteredGroups =
    selectedGroup === "all"
      ? paymentGroups
      : paymentGroups.filter((group) => group.type === selectedGroup);

  // Get current selected group name for display
  const getSelectedGroupDisplay = () => {
    if (selectedGroup === "all") return "Semua Metode Pembayaran";
    const group = paymentGroups.find((g) => g.type === selectedGroup);
    return group ? formatGroupName(group.type) : "Pilih Metode Pembayaran";
  };

  return (
    <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[7.5rem]">
     <HeaderOrder id={3} subName="Pilih Pembayaran"/>

      <div className="p-4">
        {paymentGroups.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">
              No payment methods available
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Dropdown Filter */}
            <div className="relative">
              <label
                htmlFor="payment-filter"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Select a payment list
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="relative w-full cursor-pointer rounded-lg border border-border bg-card py-2.5 pl-3 pr-10 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  <span className="block truncate text-foreground">
                    {getSelectedGroupDisplay()}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                {/* Dropdown Options */}
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-border bg-card shadow-lg">
                    <ul className="max-h-60 overflow-auto py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {/* All option */}
                      <li
                        className={`relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-primary/10 ${
                          selectedGroup === "all"
                            ? "bg-primary/5 text-primary"
                            : "text-foreground"
                        }`}
                        onClick={() => {
                          setSelectedGroup("all");
                          setIsDropdownOpen(false);
                          setSelectedMethod(null);
                        }}
                      >
                        <span className="block truncate font-medium">
                          Semua Metode Pembayaran
                        </span>
                        {selectedGroup === "all" && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </li>

                      {/* Group options */}
                      {paymentGroups.map((group) => (
                        <li
                          key={group.type}
                          className={`relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-primary/10 ${
                            selectedGroup === group.type
                              ? "bg-primary/5 text-primary"
                              : "text-foreground"
                          }`}
                          onClick={() => {
                            setSelectedGroup(group.type);
                            setIsDropdownOpen(false);
                            setSelectedMethod(null);
                          }}
                        >
                          <span className="block truncate">
                            {formatGroupName(group.type)}
                            <span className="ml-2 text-xs text-muted-foreground">
                              ({group.methods.length} methods)
                            </span>
                          </span>
                          {selectedGroup === group.type && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Methods Display */}
            <div className="space-y-6">
              {filteredGroups.map((group: MethodGrubResponse) => (
                <div key={group.type} className="space-y-4">
                  {/* Group Title - hide if showing all groups or only one group selected */}
                  {selectedGroup === "all" && (
                    <div className="border-b border-border pb-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        {formatGroupName(group.type)}
                      </h3>
                    </div>
                  )}

                  {/* Payment Methods Grid */}
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {group.methods.map((method: MethodData) => (
                      <div
                        key={method.id}
                        className={`relative flex flex-col items-center justify-center cursor-pointer rounded-lg border-2 p-5 transition-all duration-200 hover:scale-105 hover:shadow-md ${
                          selectedMethod?.id === method.id
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-border bg-card hover:border-primary/30"
                        }`}
                        onClick={() => setSelectedMethod(method)}
                        role="radio"
                        aria-checked={selectedMethod?.id === method.id}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedMethod(method);
                          }
                        }}
                      >
                        {/* Payment Method Image */}
                        <div className="mb-3 flex h-8 w-full items-center justify-center">
                          <Image
                            width={80}
                            height={100}
                            src={method.image}
                            alt={method.name}
                            className=" w-auto max-w-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder-payment.png";
                            }}
                          />
                        </div>

                        {/* Payment Method Name */}
                        <div className="text-center">
                          <div className="text-xs font-medium text-foreground line-clamp-2">
                            {method.name}
                          </div>

                          {/* Amount Range */}
                          <div className="mt-1 text-[10px] text-muted-foreground">
                            {FormatCurrency(method.minAmount)}-{" "}
                            {FormatCurrency(method.maxAmount)}
                          </div>

                          {/* Fee (if exists) */}
                          {method.fee && (
                            <div className="text-[10px] text-orange-600">
                              Fee: Rp {method.fee.toLocaleString("id-ID")}
                            </div>
                          )}
                        </div>

                        {/* Selected Indicator */}
                        {selectedMethod?.id === method.id && (
                          <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <svg
                              className="h-2.5 w-2.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close dropdown when clicking outside */}
        {isDropdownOpen && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    </section>
  );
}
