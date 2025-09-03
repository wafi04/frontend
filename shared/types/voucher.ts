export interface CreateVoucherRequest {
  code: string;
  type: string;
  title: string;
  description?: string;
  amount: number;
  percentage: number | null; // Allow null for FIXED type
  maxDiscount: number;
  minCartValue: number;
  status: string;
  issuedQty: number;
  usedCount: number;
  usedLimit: number;
  usagePerUser: number;
  validFrom: string; // ISO 8601 date string with timezone
  validUntil: string; // ISO 8601 date string with timezone
  isActive: boolean;
}

export interface VoucherData {
  id: number;
  code: string;
  type: string;
  title: string;
  description?: string;
  amount: number;
  percentage: number;
  maxDiscount: number;
  minCartValue: number;
  status: string;
  issuedQty: number;
  usedCount: number;
  usedLimit: number;
  usagePerUser: number;
  validFrom: string; // ISO 8601 date string with timezone
  validUntil: string; // ISO 8601 date string with timezone
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
