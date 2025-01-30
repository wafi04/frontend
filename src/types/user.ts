export type ROLE = "admin" | "user";

export interface AuthResponse {
  user: UserData;
}

export interface SessionsResponse {
  sessions: SessionData[];
}

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
