export type ROLE = "admin" | "user";

export interface AuthResponse {
  user: UserData;
}

export interface SessionsResponse {
  sessions: SessionData[];
}

export type UserProfile = {
  user_id: string;
  place_birth: string;
  date_birth: string;
  gender: "male" | "female" | "other";
  phone_number: string;
  bio: string;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
  };
  created_at: string;
  updated_at: string;
};

export interface SessionData {
  created_at: number;
  device_info: string;
  ip_address: string;
  last_activity_at: number;
  session_id: string;
}

export interface UserData {
  created_at: number;
  email: string;
  is_email_verified: boolean;
  last_login_at: number;
  picture: string | null;
  name: string;
  role: "user" | "admin";
  updated_at: number;
  user_id: string;
}

export interface ShippingResponse {
  address: ShoppingAddrData[];
}

export interface ShoppingAddrData {
  user_id: string;
  address_id: string;
  recipient_name: string;
  recipient_phone: string;
  full_address: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  label?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}
