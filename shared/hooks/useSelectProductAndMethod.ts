import { create } from "zustand";
import { useCreateTransactions } from "@/features/transactions/hooks/api";
import { useState } from "react";

// Types
interface Method {
  id: number;
  code: string;
  name: string;
  fee: number;
  feeType: "fixed" | "percentage";
}

export interface FormOrderType {
  gameId: string;
  serverId?: string;
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

// Voucher configuration
const VOUCHER_CONFIGS = {
  DISKON10: { discount: 0.1, type: "percentage" as const },
  DISKON20: { discount: 0.2, type: "percentage" as const },
  // Add more vouchers as needed
} as const;

// Zustand Store
interface OrderState {
  // Product & Method State
  productPrice: number;
  selectedMethod: Method | null;
  productCode: string;

  // Form Data
  formData: FormOrderType;

  // UI State
  errors: Record<string, string>;

  // Actions
  setProductPrice: (price: number) => void;
  setSelectedMethod: (method: Method | null) => void;
  setProductCode: (code: string) => void;
  setFormData: (data: Partial<FormOrderType>) => void;
  setError: (field: string, message: string) => void;
  clearErrors: () => void;
  clearForm: () => void;

  // Computed
  getCalculation: () => OrderCalculation;
  validateForm: () => boolean;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  // Initial State
  productPrice: 0,
  selectedMethod: null,
  productCode: "",
  formData: {
    gameId: "",
    serverId: "",
    nickname: "",
    productCode: "",
    phoneNumber: "",
    email: "",
    voucherCode: "",
  },
  errors: {},

  // Actions
  setProductPrice: (price) => set({ productPrice: price }),

  setSelectedMethod: (method) => set({ selectedMethod: method }),

  setProductCode: (code) =>
    set((state) => ({
      productCode: code,
      formData: { ...state.formData, productCode: code },
    })),

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  setError: (field, message) =>
    set((state) => ({
      errors: { ...state.errors, [field]: message },
    })),

  clearErrors: () => set({ errors: {} }),

  clearForm: () =>
    set({
      formData: {
        gameId: "",
        serverId: "",
        nickname: "",
        productCode: "",
        phoneNumber: "",
        email: "",
        voucherCode: "",
      },
      errors: {},
      productPrice: 0,
      selectedMethod: null,
      productCode: "",
    }),

  // Computed
  getCalculation: () => {
    const { productPrice, selectedMethod, formData } = get();
    let methodFee = 0;
    if (selectedMethod) {
      methodFee =
        selectedMethod.feeType === "fixed"
          ? selectedMethod.fee
          : productPrice * (selectedMethod.fee / 100);
    }
    let voucherDiscount = 0;
    if (
      formData.voucherCode &&
      VOUCHER_CONFIGS[formData.voucherCode as keyof typeof VOUCHER_CONFIGS]
    ) {
      const voucher =
        VOUCHER_CONFIGS[formData.voucherCode as keyof typeof VOUCHER_CONFIGS];
      voucherDiscount =
        voucher.type === "percentage"
          ? productPrice * voucher.discount
          : voucher.discount;
    }
    const totalAmount = productPrice + methodFee - voucherDiscount;
    return {
      productPrice,
      methodFee,
      voucherDiscount,
      totalAmount,
    };
  },

  validateForm: () => {
    const { formData, setError, clearErrors, productCode } = get();
    clearErrors();
    let valid = true;
    if (!formData.gameId) {
      setError("gameId", "Game ID is required");
      valid = false;
    }
    if (!formData.nickname) {
      setError("nickname", "Nickname is required");
      valid = false;
    }
    if (!productCode) {
      setError("productCode", "Product code is required");
      valid = false;
    }

    return valid;
  },
}));
