import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeaderProductProps {
  title: string;
  count?: number;
  children?: ReactNode;
  className?: string;
}

export default function HeaderProductPage({
  title,
  count,
  className,
  children,
}: HeaderProductProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-center w-full mx-auto",
        className
      )}
    >
      <div className="flex space-x-4 text-xl">
        <h1 className="">{title}</h1>
        <p className="">{`(${count})`}</p>
      </div>
      {children}
    </div>
  );
}
