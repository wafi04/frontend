export interface User {
  id: number;
  balance: number;
  domain: string;
  email: string;
  ip_address: string;
  is_active: boolean;
  last_activity: string;
  role_name: string;
  user_agent: string;
  username: string;
}

export interface UserData {
  balance: number;
  branchName: string;
  createdAt: string;
  email: string;
  id: number;
  isActive: boolean;
  roleName: string;
  updatedAt: string;
  username: string;
}
