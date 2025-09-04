"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  Menu,
  Calculator,
  ShoppingBag,
  ReceiptText,
  TrendingUp,
  Target,
  Crown,
  Star,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const navItems = [
    { label: "TopUp", href: "/", icon: ShoppingBag },
    { label: "Cek Transaksi", href: "/cek-transaksi", icon: ReceiptText },
    { label: "Leaderboard", href: "/leaderboard", icon: TrendingUp },
  ];

  const calculatorOptions = [
    { 
      label: "Winrate Calculator", 
      href: "/calculator/winrate", 
      icon: Target,
      description: "Hitung winrate yang dibutuhkan untuk mencapai rank"
    },
    { 
      label: "Magic Wheel Calculator", 
      href: "/calculator/magicwheel", 
      icon: Crown,
      description: "Kalkulasi point dan rank Magic Wheel"
    },
    { 
      label: "Zodiac Calculator", 
      href: "/calculator/zodiac", 
      icon: Star,
      description: "Hitung kombinasi dan efek zodiac"
    },
  ];

  // Fixed Framer Motion variants
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const iconVariants = {
    rest: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.2 },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };

  const underlineVariants = {
    rest: {
      scaleX: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    hover: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  const popoverVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-secondary/80 backdrop-blur-md duration-500 ease-in-out print:hidden">
      <div className="border-b">
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            className="flex items-center justify-start"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/id-id" className="outline-none">
              <span className="sr-only"> Logo</span>
              <Image
                alt="OURASTORE Logo"
                width={1000}
                height={1000}
                className="h-9 w-auto lg:h-10 transition-all duration-200"
                style={{ color: "transparent" }}
                src="https://cdn.ourastore.com/ourastore.com/meta/ourastorelogo.png"
              />
            </Link>
          </motion.div>

          {/* Search Bar */}
          <div className="flex flex-1 items-center justify-end gap-2">
            {/* Desktop search */}
            <div className="relative w-full hidden md:flex">
              <div className="relative w-full">
                <motion.input
                  type="text"
                  placeholder="Cari Game atau Voucher"
                  className="h-9 w-full rounded-lg border border-muted-foreground/10 bg-input/80 pl-9 text-sm placeholder:text-muted-foreground/75 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-75 transition-all duration-200"
                  whileFocus={{ scale: 1.02 }}
                />
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/75" />
                <button type="button" className="outline-none invisible">
                  <X className="absolute right-3 top-1/2 size-4 -translate-y-1/2" />
                </button>
              </div>
            </div>

            {/* Mobile Search Button */}
            <motion.button
              type="button"
              className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border/50 bg-transparent text-sm font-medium hover:bg-accent/75 hover:text-accent-foreground transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="size-5" />
            </motion.button>

            {/* Mobile menu button */}
            <div className="block md:hidden">
              <motion.button
                type="button"
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border/50 bg-transparent text-sm font-medium hover:bg-accent/75 hover:text-accent-foreground transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="size-5" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border bg-secondary/95 backdrop-blur-md"
          >
            <div className="container py-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari Game atau Voucher"
                  className="h-10 w-full rounded-lg border border-muted-foreground/10 bg-input/80 pl-10 pr-10 text-sm placeholder:text-muted-foreground/75 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/75" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="size-4 text-muted-foreground/75" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="container hidden h-12 w-full items-center justify-between border-b md:flex">
        <motion.div
          className="flex h-full items-center gap-6"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = item.label === "TopUp";

            return (
              <motion.div key={item.label} variants={itemVariants}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  className="relative h-full"
                >
                  <Link
                    href={item.href}
                    className={`relative inline-flex h-12 items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <motion.div variants={iconVariants}>
                      <IconComponent size={18} />
                    </motion.div>
                    <span>{item.label}</span>
                  </Link>

                  {/* Animated underline */}
                  {isActive ? (
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary" />
                  ) : (
                    <motion.div
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-primary origin-left"
                      variants={underlineVariants}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
          
          {/* Calculator Dropdown */}
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              initial="rest"
              whileHover="hover"
              className="relative h-full"
            >
              <button
                className="relative inline-flex h-12 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                onMouseEnter={() => setIsCalculatorOpen(true)}
                onMouseLeave={() => setIsCalculatorOpen(false)}
              >
                <motion.div variants={iconVariants}>
                  <Calculator size={18} />
                </motion.div>
                <span>Kalkulator</span>
                <motion.div
                  animate={{ rotate: isCalculatorOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} />
                </motion.div>
              </button>

              <motion.div
                className="absolute inset-x-0 bottom-0 h-[2px] bg-primary origin-left"
                variants={underlineVariants}
              />
            </motion.div>

            {/* Calculator Popover */}
            <AnimatePresence>
              {isCalculatorOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={popoverVariants}
                  className="absolute left-0 top-full mt-2 w-80 rounded-lg border border-border/20 bg-background/95 backdrop-blur-md shadow-lg"
                  onMouseEnter={() => setIsCalculatorOpen(true)}
                  onMouseLeave={() => setIsCalculatorOpen(false)}
                >
                  <div className="p-2">
                    {calculatorOptions.map((option, index) => {
                      const IconComponent = option.icon;
                      
                      return (
                        <motion.div
                          key={option.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: index * 0.1 }
                          }}
                        >
                          <Link
                            href={option.href}
                            className="flex items-start gap-3 rounded-md p-3 text-sm hover:bg-accent/50 transition-colors duration-200 group"
                            onClick={() => setIsCalculatorOpen(false)}
                          >
                            <motion.div 
                              className="mt-0.5 text-primary"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <IconComponent size={18} />
                            </motion.div>
                            <div className="flex-1 space-y-1">
                              <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                                {option.label}
                              </div>
                              <div className="text-xs text-muted-foreground leading-relaxed">
                                {option.description}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border/20 bg-secondary/95 backdrop-blur-md"
          >
            <div className="container py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = item.label === "TopUp";

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent size={18} />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Calculator Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="mt-2"
                >
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Kalkulator
                  </div>
                  <div className="space-y-1">
                    {calculatorOptions.map((option, index) => {
                      const IconComponent = option.icon;
                      
                      return (
                        <motion.div
                          key={option.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (navItems.length + index + 1) * 0.1 }}
                        >
                          <Link
                            href={option.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <IconComponent size={18} />
                            <span>{option.label}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}