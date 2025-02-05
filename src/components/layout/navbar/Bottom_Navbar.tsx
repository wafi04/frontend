import { Badge } from "@/components/ui/badge";
import { CategoryData } from "@/types/categories";
import { UserData } from "@/types/user";
import { Bell, ShoppingBag } from "lucide-react";
import Link from "next/link";
import SearchInput from "@/features/search/components/SeachInput";
import HeaderDropdown from "./header-dropdown";

interface BottomNavbarProps {
  user: UserData;
  onMobile: () => void;
  categories: CategoryData[];
}

export function BottomNavbar({ categories }: BottomNavbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-black">
        FIXSTORE
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        {categories &&
          categories.map((item) => (
            <HeaderDropdown key={item.id} categories={item}>
              <Link
                key={item.id}
                href={`/c/${item.name}`}
                className="text-sm font-medium bg-transparent p-2 text-gray-700 hover:text-black transition-colors">
                <p>{item.name}</p>
              </Link>
            </HeaderDropdown>
          ))}
      </nav>

      {/* Icons (Search, Cart, Notifications) */}
      <div className="flex items-center space-x-4">
        <SearchInput />
        <Link
          href="/cart"
          className="relative text-gray-700 hover:text-black transition-colors">
          <ShoppingBag className="w-6 h-6" />
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 px-2 py-0.5 text-xs">
            {/* Cart item count */}
          </Badge>
        </Link>
        <Link
          href="/dashboard/notifications"
          className="relative text-gray-700 hover:text-black transition-colors">
          <Bell className="w-6 h-6" />
          <Badge
            variant="default"
            className="absolute -top-2 -right-2 px-2 py-0.5 text-xs">
            {/* Notification count */}
          </Badge>
        </Link>
      </div>
    </div>
  );
}
