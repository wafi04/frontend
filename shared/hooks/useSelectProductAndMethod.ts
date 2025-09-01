import { create } from "zustand";

interface Method {
  id: number;
  code: string;
  name: string;
  fee: number;
  feeType: "fixed" | "percentage";
}

interface State {
  productPrice: number;
  selectedMethod: Method | null;
  setProductPrice: (price: number) => void;
  setSelectedMethod: (method: Method | null) => void;
}

export const useProductAndMethod = create<State>((set) => ({
  productPrice: 0,
  selectedMethod: null,
  setProductPrice: (price) => set({ productPrice: price }),
  setSelectedMethod: (method) => set({ selectedMethod: method }),
}));
