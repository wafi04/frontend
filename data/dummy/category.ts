import { Category, CategoryOmit } from "@/shared/types/category";

export const dataCategories: CategoryOmit[] = [
  {
    id: 1,
    name: "Pulsa",
    description: "Kategori untuk produk pulsa semua operator.",
    icon: "📱",
    type: "games",
    sort_order: 1,
    is_active: true,
  },
  {
    id: 2,
    name: "Paket Data",
    description: "Kategori untuk paket internet kuota.",
    icon: "🌐",
    type: "games",
    sort_order: 2,
    is_active: true,
  },
  {
    id: 3,
    name: "Token PLN",
    description: "Kategori untuk token listrik prabayar.",
    icon: "⚡",
    type: "pln",
    sort_order: 3,
    is_active: true,
  },
  {
    id: 4,
    name: "Voucher Game",
    description: "Kategori untuk top up voucher game online.",
    icon: "🎮",
    type: "games",
    sort_order: 4,
    is_active: false,
  },
  {
    id: 5,
    name: "E-Wallet",
    description: "Kategori untuk top up saldo dompet games.",
    icon: "💳",
    type: "ewallet",
    sort_order: 5,
    is_active: true,
  },
];
