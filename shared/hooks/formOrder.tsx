import {
  TransactionResponse,
  useCreateTransactions,
} from "@/features/transactions/hooks/api";
import { useState } from "react";
import { useOrderStore } from "./useSelectProductAndMethod";

export function useOrder() {
  const { mutate, isPending } = useCreateTransactions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [transactionResult, setTransactionResult] =
    useState<TransactionResponse | null>(null);

  const store = useOrderStore();

  const submitOrder = () => {
    if (isSubmitting || isPending) return;

    // Validasi form terlebih dahulu
    store.clearErrors();
    if (!store.validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { formData, selectedMethod } = store;

      const noTujuan = formData.serverId?.trim()
        ? `${formData.gameId.trim()}${formData.serverId.trim()}`
        : formData.gameId.trim();

      mutate(
        {
          nickname: formData.nickname.trim() || "",
          noTujuan,
          type: "topup",
          paymentMethod: selectedMethod!.code,
          productCode: store.productCode,
          ...(formData.voucherCode && {
            voucherCode: formData.voucherCode.trim().toUpperCase(),
          }),
        },
        {
          onSuccess: (data) => {
            console.log("Transaction successful:", data);
            setTransactionResult(data.data);
            setShowDialog(true);
          },
          onError: (error) => {
            console.error("Transaction failed:", error);
            const message =
              error instanceof Error ? error.message : "Terjadi kesalahan";
            store.setError("root", message);
          },
        }
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      store.setError("root", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmOrder = () => {
    submitOrder();
  };

  const closeDialog = () => {
    setShowDialog(false);
    setTransactionResult(null);

    if (transactionResult) {
      store.clearForm();
    }
  };

  return {
    // State
    ...store.formData,
    errors: store.errors,
    productPrice: store.productPrice,
    selectedMethod: store.selectedMethod,
    productCode: store.productCode,
    calculation: store.getCalculation(),

    // Dialog state
    showDialog,
    transactionResult,

    // Loading
    isSubmitting: isSubmitting || isPending,

    // Actions
    setFormData: store.setFormData,
    setProductPrice: store.setProductPrice,
    setSelectedMethod: store.setSelectedMethod,
    setProductCode: store.setProductCode,
    setError: store.setError,
    clearErrors: store.clearErrors,
    clearForm: store.clearForm,
    validateForm: store.validateForm,

    // Dialog actions
    submitOrder, // Langsung submit tanpa konfirmasi
    confirmOrder, // Alias untuk submitOrder (untuk backward compatibility)
    closeDialog, // Close dialog hasil transaksi
  };
}
