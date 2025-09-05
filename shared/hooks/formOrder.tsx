import { useForm, UseFormReturn } from "react-hook-form";
import { useState, useMemo } from "react";
import { useProductAndMethod } from "./useSelectProductAndMethod";

export interface FormOrderType {
  gameId: string;
  serverId?: string;
  methodCode: string;
  methodFee?: number;
  methodFeeType: string;
  nickname: string;
  productCode: string;
  phoneNumber?: string;
  email?: string;
  voucherCode?: string;
}

export interface OrderCalculation {
  productPrice: number;
  methodFee: number;
  voucherDiscount: number;
  totalAmount: number;
}

export interface UseOrderReturn {
  form: UseFormReturn<FormOrderType>;
  calculation: OrderCalculation;
  isCalculating: boolean;
  submitOrder: (data: FormOrderType) => Promise<void>;
  resetForm: () => void;
}

export function useOrder(): UseOrderReturn {
  const { productPrice, selectedMethod } = useProductAndMethod();
  const form = useForm<FormOrderType>({
    defaultValues: {
      gameId: "",
      serverId: "",
      methodCode: "",
      methodFeeType: selectedMethod?.feeType ?? "fixed",
      nickname: "",
      productCode: "",
      phoneNumber: "",
      email: "",
      voucherCode: "",
    },
    mode: "onChange",
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const watchedValues = form.watch();

  const calculation = useMemo((): OrderCalculation => {
    const price = productPrice ?? 0;
    const feeValue = selectedMethod?.fee ?? 0;

    let fee = 0;
    if ((selectedMethod?.feeType ?? "fixed") === "percentage") {
      fee = price * (feeValue / 100);
    } else {
      fee = feeValue;
    }

    let voucherDiscount = 0;
    if (watchedValues.voucherCode === "DISKON10") {
      voucherDiscount = price * 0.1;
    }

    const totalAmount = price + fee - voucherDiscount;

    return {
      productPrice: price,
      methodFee: fee,
      voucherDiscount,
      totalAmount: Math.max(0, totalAmount),
    };
  }, [
    productPrice,
    selectedMethod?.fee,
    selectedMethod?.feeType,
    watchedValues.voucherCode,
  ]);

  const submitOrder = async (data: FormOrderType): Promise<void> => {
    setIsCalculating(true);

    try {
      const orderData = {
        ...data,
        calculation,
        timestamp: new Date().toISOString(),
      };

      console.log("Submitting order:", orderData);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Order berhasil disubmit!");
    } catch (error) {
      form.setError("root", {
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const resetForm = () => form.reset();

  return {
    form,
    calculation,
    isCalculating,
    submitOrder,
    resetForm,
  };
}
