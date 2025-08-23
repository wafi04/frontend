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
  // {
  //     id: 'analytics',
  //     label: 'Analytics',
  //     icon: BarChart3,
  //     href: '/analytics',
  //     badge: 'New'
  // },
  {
    id: "users",
    label: "Users",
    icon: Users,
    href: "/dashboard/users",
    badge: "12",
    subItems: [
      { label: "All Users", href: "/dashboard/users/all" },
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
      { label: "Categories", href: "/dashboard/category" },
      { label: "Products", href: "/dashboard/all" },
      { label: "Sub Category", href: "/dashboard/subcategories" },
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
    label: "Method",
    icon: Wallet,
    href: "/dashboard/methods",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
