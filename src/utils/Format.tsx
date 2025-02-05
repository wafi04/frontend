import { cn } from "@/lib/utils";
import { MobileIcon } from "@radix-ui/react-icons";
import { LaptopIcon, TabletIcon } from "lucide-react";
import { ReactNode } from "react";

export function FormatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export const formatDateForInput = (
  isoString: string | null | undefined
): string => {
  if (!isoString) return "";
  try {
    return new Date(isoString).toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export const formatDateForServer = (dateString: string): string => {
  try {
    return new Date(dateString).toISOString();
  } catch (error) {
    console.error("Error formatting date for server:", error);
    return dateString;
  }
};

export const FormatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

interface DeviceTypeResult {
  icon?: ReactNode;
  name: string;
}

export function identifyDeviceType({
  userAgent,
}: {
  userAgent: string;
}): DeviceTypeResult {
  const devicePatterns = {
    mobile: [
      "Android",
      "webOS",
      "iPhone",
      "iPod",
      "BlackBerry",
      "Windows Phone",
      "Mobile",
    ],
    tablet: ["iPad", "Kindle", "Silk", "Android.*Tablet", "Tablet"],
    laptop: ["Windows", "Macintosh", "Linux", "X11"],
  } as const;

  const checkPattern = (patterns: readonly string[]): boolean =>
    patterns.some((pattern) => new RegExp(pattern, "i").test(userAgent));

  if (checkPattern(devicePatterns.mobile)) {
    return {
      icon: <MobileIcon className="size-14 " />,
      name: "Mobile",
    };
  }

  if (checkPattern(devicePatterns.tablet)) {
    return {
      icon: <TabletIcon className="size-14 " />,
      name: "Tablet",
    };
  }

  if (checkPattern(devicePatterns.laptop)) {
    return {
      icon: <LaptopIcon className="size-14 " />,
      name: "Laptop",
    };
  }

  return {
    name: "Unknown",
  };
}

export function DeviceInfo({
  item,
  className,
}: {
  item: string;
  className?: string;
}) {
  const deviceType = identifyDeviceType({ userAgent: item });

  return <div className="flex-shrink-0">{deviceType.icon}</div>;
}
