export type PaymentMethodType =
  | "virtual-account"
  | "ewallet"
  | "qris"
  | "bank-transfer"
  | "csstore"; // contoh minimarket

export const paymentMethodTypes = () => [
  { name: "Virtual Account", value: "virtual-account" },
  { name: "E-Wallet", value: "e-wallet" },
  { name: "QRIS", value: "qris" },
  { name: "Transfer Bank", value: "bank-transfer" },
  { name: "CSSTORE (Minimarket)", value: "csstore" },
];
