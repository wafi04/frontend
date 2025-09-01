export interface Roles {
  id: number;
  name: string;
  description?: string | null;
  marginProfit?: number | null;
  marginProfitType?: string | null;
  isActive: boolean;
}

export interface UpsertRoles {
  name: string;
  description?: string | null;
  marginProfit?: number | null;
  marginProfitType?: string | null;
  isActive: boolean;
}
