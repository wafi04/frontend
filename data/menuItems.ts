import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  Inbox,
  Calendar,
  Wallet,
} from "lucide-react";

export interface SubMenuItem {
  label: string;
  href: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | number | null;
  subItems?: SubMenuItem[];
}

export interface ExpandedItems {
  [key: string]: boolean;
}
export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/",
    badge: null,
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    href: "/dashboard/users",
    badge: "12",
    subItems: [
      { label: "All Users", href: "/dashboard/users" },
      { label: "Roles", href: "/dashboard/users/roles" },
      { label: "Permissions", href: "/dashboard/users/permissions" },
    ],
  },
  {
    id: "product",
    label: "Product",
    icon: FileText,
    href: "/dashboard/product",
    subItems: [
      { label: "Kategori", href: "/dashboard/category" },
      { label: "Produk", href: "/dashboard/product" },
      { label: "Sub Kategori", href: "/dashboard/subcategory" },
    ],
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: Inbox,
    href: "/inbox",
    badge: "5",
  },
  {
    id: "method",
    label: "Metode Pembayaran",
    icon: Wallet,
    href: "/dashboard/method",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
