"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/auth/userAuthStore";

export function LayoutsWithHeaderAndFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isLoading } = useAuth();
  if (isLoading) {
    return (
      <motion.div
        className="h-screen w-full flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <Loader2 className="text-4xl text-blue-500 animate-spin" />
      </motion.div>
    );
  }

  return (
    <>
      <Navbar />
      <main className={cn(``, className)}>{children}</main>
      <Footer />
    </>
  );
}
