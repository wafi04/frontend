import { CheckCircle, Clock, XCircle } from "lucide-react";

export const getStatusConfig = (status: string) => {
  switch (status) {
    case "PENDING":
      return {
        icon: <Clock className="w-4 h-4" />,
        variant: "outline" as const,
        className: "border-yellow-200 text-yellow-800 bg-yellow-50",
        text: "Menunggu Pembayaran",
      };
    case "PAID":
      return {
        icon: <CheckCircle className="w-4 h-4" />,
        variant: "outline" as const,
        className: "border-blue-200 text-blue-800 bg-blue-50",
        text: "Pembayaran Berhasil",
      };
    case "SUCCESS":
      return {
        icon: <CheckCircle className="w-4 h-4" />,
        variant: "outline" as const,
        className: "border-green-200 text-green-800 bg-green-50",
        text: "Transaksi Berhasil",
      };
    case "FAILED":
      return {
        icon: <XCircle className="w-4 h-4" />,
        variant: "destructive" as const,
        className: "",
        text: "Transaksi Gagal",
      };
    default:
      return {
        icon: <Clock className="w-4 h-4" />,
        variant: "secondary" as const,
        className: "",
        text: "Unknown",
      };
  }
};
