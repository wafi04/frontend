import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Activity,
} from "lucide-react";

interface StatusBadgeProps {
  status: string;
  count?: number;
  showCount?: boolean;
}

export function StatusBadge({
  status,
  count,
  showCount = true,
}: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return {
          color:
            "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
          icon: CheckCircle,
        };
      case "pending":
        return {
          color:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
          icon: Clock,
        };
      case "failed":
        return {
          color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
          icon: XCircle,
        };
      case "error":
        return {
          color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
          icon: AlertCircle,
        };
      default:
        return {
          color:
            "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
          icon: Activity,
        };
    }
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
    >
      <IconComponent className="w-4 h-4 mr-2" />
      {status}
      {showCount && count !== undefined && `: ${count.toLocaleString()}`}
    </div>
  );
}
