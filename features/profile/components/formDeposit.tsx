"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetMethodByType } from "@/features/methods/hooks/api";
import { useState } from "react";
import {
  Loader2,
  CreditCard,
  QrCode,
  Store,
  Wallet,
  Banknote,
} from "lucide-react";
import { PaymentMethod, ResponseMethod } from "@/shared/types/method"; // Pastikan interface di-import

// --- Icon Mapping ---
const MethodIcon = (type: string) => {
  switch (type) {
    case "virtual-account":
      return <Banknote className="h-5 w-5" />;
    case "qris":
      return <QrCode className="h-5 w-5" />;
    case "cstore":
      return <Store className="h-5 w-5" />;
    case "e-wallet":
      return <Wallet className="h-5 w-5" />;
    default:
      return <CreditCard className="h-5 w-5" />;
  }
};

export function FormDepositContent() {
  const [selectedNominal, setSelectedNominal] = useState<string | null>(
    "50000"
  );
  const [customNominal, setCustomNominal] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<ResponseMethod | null>(null); // <-- Simpan tipe yang dipilih
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading } = useGetMethodByType(); // data: { data: ResponseMethod[] }

  const NOMINAL_OPTIONS = [
    { value: "50000", label: "Rp 50.000" },
    { value: "100000", label: "Rp 100.000" },
    { value: "200000", label: "Rp 200.000" },
    { value: "500000", label: "Rp 500.000" },
    { value: "1000000", label: "Rp 1.000.000" },
  ];

  const handleCustomNominalChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomNominal(value);
    if (value) setSelectedNominal(null);
  };

  const handleNominalSelect = (value: string) => {
    setSelectedNominal(value);
    setCustomNominal("");
  };

  const handleTypeClick = (type: ResponseMethod) => {
    setSelectedType(type);
    setSelectedMethod(null); // reset method saat ganti tipe
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    if (method.status !== "active") return;
    setSelectedMethod(method);
  };

  const finalNominal = parseInt(selectedNominal || customNominal, 10);
  const isNominalValid = !isNaN(finalNominal) && finalNominal >= 1000;
  const isFormValid = selectedMethod && isNominalValid;

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-5 bg-card rounded-xl shadow-md mx-auto border border-border/30">
      {/* Judul */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Isi Saldo</h2>
        <p className="text-sm text-muted-foreground">
          Pilih nominal dan metode pembayaran
        </p>
      </div>

      {/* Nominal Section */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Nominal Deposit</Label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {NOMINAL_OPTIONS.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={selectedNominal === option.value ? "default" : "outline"}
              onClick={() => handleNominalSelect(option.value)}
              className={`py-3 text-sm font-medium transition-all duration-200 ${
                selectedNominal === option.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="mt-4">
          <Label className="text-sm font-medium">Nominal Lain</Label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              Rp
            </span>
            <Input
              type="text"
              placeholder="Misal: 75000"
              value={customNominal}
              onChange={handleCustomNominalChange}
              className={`pl-10 ${
                customNominal && !isNominalValid
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }`}
            />
          </div>
          {customNominal && !isNominalValid && (
            <p className="text-red-500 text-xs mt-1">Minimal Rp 1.000</p>
          )}
        </div>

        {isNominalValid && (
          <div className="text-sm text-primary font-medium">
            Jumlah:{" "}
            <span className="font-bold">
              Rp {finalNominal.toLocaleString("id-ID")}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-lg font-semibold text-foreground">
          Pilih Jenis Pembayaran
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {data?.data.map((typeGroup) => (
            <Button
              key={typeGroup.type}
              type="button"
              variant="outline"
              onClick={() => handleTypeClick(typeGroup)}
              className="flex flex-col items-center h-full justify-center py-4 gap-2 hover:bg-secondary transition-all"
            >
              <span>{MethodIcon(typeGroup.type)}</span>
              <span className="text-xs font-medium capitalize">
                {typeGroup.type.replace("-", " ")}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
          {selectedType?.methods
            .filter((method) => method.status === "active")
            .map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => handleMethodSelect(method)}
                className={`p-3 text-left border rounded-lg transition-all flex items-center gap-3 ${
                  selectedMethod?.id === method.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-primary"
                }`}
              >
                <img
                  src={method.image}
                  alt={method.name}
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <p className="font-medium text-foreground">{method.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </button>
            ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        className="w-full py-3 text-md font-semibold rounded-lg transition-all duration-200"
        disabled={!isFormValid || isSubmitting}
        onClick={() => {
          setIsSubmitting(true);
          console.log("Deposit:", {
            nominal: finalNominal,
            method: selectedMethod,
          });
          // Kirim ke API di sini
          // setTimeout(() => setIsSubmitting(false), 2000);
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Memproses...
          </>
        ) : (
          `Lanjutkan ke ${selectedMethod?.name || "Pembayaran"}`
        )}
      </Button>
    </div>
  );
}
