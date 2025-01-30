export * from "./env"

export const MAX_PRICE = 2000000;
export const MIN_PRICE = 0;

export enum STEPS_VARIANST_FORM {
  BASIC_INFORMATION = 1,
  IMAGE = 2,
  INVENTORY = 3,
}
export const COLORS = [
  "White",
  "Black",
  "Blue",
  "Red",
  "Green",
  "Gray",
  "Navy",
  "Pink",
] as const;

export const SIZES = [
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
] as const;
