export interface Roles {
  id: number;
  name: string;
  description?: string 
  profit?: number 
  profitPercentage : number
  profitType:  "hybrid" | "percentage"  | "fixed" 
  isActive: boolean;
}

export interface UpsertRoles {
  name: string;
  description?: string 
  profit?: number 
    profitPercentage : number

  profitType:  "hybrid" | "percentage"  | "fixed" 
  isActive: boolean;
}
