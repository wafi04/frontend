import { UseGetAllFlashSales } from "@/features/events/flash-sales/api/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  ArrowRight,
  Zap,
  Timer,
  ChevronLeft,
  ChevronRight,
  Flame,
  ShoppingBag,
} from "lucide-react";
import { format, isAfter, isBefore, differenceInSeconds } from "date-fns";
import { id } from "date-fns/locale";
import { useState, useEffect } from "react";

export interface FlashSale {
  banner_url: string | null;
  created_at: string;
  description: string;
  end_at: string;
  id: number;
  is_active: boolean;
  start_at: string;
  title: string;
  updated_at: string;
  usage_limit: number;
  usage_per_user: number;
}

// Countdown Hook
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

// Single Flash Sale Banner
function FlashSaleBanner({
  flashSale,
  onShopNow,
}: {
  flashSale: FlashSale;
  onShopNow?: (sale: FlashSale) => void;
}) {
  const now = new Date();
  const startDate = new Date(flashSale.start_at);
  const endDate = new Date(flashSale.end_at);

  const isActive =
    flashSale.is_active && isAfter(now, startDate) && isBefore(now, endDate);
  const isUpcoming = flashSale.is_active && isBefore(now, startDate);

  const countdownTarget = isUpcoming ? flashSale.start_at : flashSale.end_at;
  const countdown = useCountdown(countdownTarget);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 min-h-[300px] flex items-center">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div> */}

      {/* Banner Image */}
      {flashSale.banner_url && (
        <div className="absolute inset-0">
          <img
            src={flashSale.banner_url}
            alt={flashSale.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-8 py-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="flex-1 text-white mb-6 lg:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                <Flame className="w-3 h-3 mr-1" />
                {isActive
                  ? "FLASH SALE AKTIF"
                  : isUpcoming
                  ? "SEGERA DIMULAI"
                  : "FLASH SALE"}
              </Badge>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
              {flashSale.title}
            </h2>

            {flashSale.description && (
              <p className="text-lg opacity-90 mb-4 max-w-lg">
                {flashSale.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-1">
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {flashSale.usage_limit
                    ? `Terbatas ${flashSale.usage_limit.toLocaleString()} item`
                    : "Unlimited"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Max {flashSale.usage_per_user} per user</span>
              </div>
            </div>
          </div>

          {/* Right Content - Countdown & CTA */}
          <div className="flex-shrink-0 text-center">
            {(isActive || isUpcoming) && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-white/20">
                <div className="text-white mb-3">
                  <Timer className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">
                    {isUpcoming ? "Dimulai dalam:" : "Berakhir dalam:"}
                  </p>
                </div>

                <div className="flex gap-2 justify-center">
                  {countdown.days > 0 && (
                    <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
                      <div className="text-xl font-bold text-white">
                        {countdown.days}
                      </div>
                      <div className="text-xs text-white/80">Hari</div>
                    </div>
                  )}
                  <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
                    <div className="text-xl font-bold text-white">
                      {countdown.hours.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-white/80">Jam</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
                    <div className="text-xl font-bold text-white">
                      {countdown.minutes.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-white/80">Menit</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
                    <div className="text-xl font-bold text-white">
                      {countdown.seconds.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-white/80">Detik</div>
                  </div>
                </div>
              </div>
            )}

            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={() => onShopNow?.(flashSale)}
            >
              {isActive
                ? "Belanja Sekarang"
                : isUpcoming
                ? "Set Reminder"
                : "Lihat Detail"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact Flash Sale Card for slider
function CompactFlashSaleCard({
  flashSale,
  onShopNow,
}: {
  flashSale: FlashSale;
  onShopNow?: (sale: FlashSale) => void;
}) {
  const now = new Date();
  const startDate = new Date(flashSale.start_at);
  const endDate = new Date(flashSale.end_at);

  const isActive =
    flashSale.is_active && isAfter(now, startDate) && isBefore(now, endDate);
  const isUpcoming = flashSale.is_active && isBefore(now, startDate);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative h-40 bg-gradient-to-br from-red-400 to-orange-500">
          {flashSale.banner_url ? (
            <img
              src={flashSale.banner_url}
              alt={flashSale.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <Zap className="w-12 h-12" />
            </div>
          )}

          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-red-500 text-white border-0"
            >
              <Flame className="w-3 h-3 mr-1" />
              {isActive ? "AKTIF" : isUpcoming ? "SOON" : "SALE"}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
            {flashSale.title}
          </h3>

          {flashSale.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {flashSale.description}
            </p>
          )}

          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              <div className="flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3" />
                <span>
                  Berakhir {format(endDate, "dd MMM", { locale: id })}
                </span>
              </div>
            </div>

            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => onShopNow?.(flashSale)}
            >
              Shop
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading Skeleton
function FlashSaleSkeleton() {
  return (
    <div className="rounded-2xl bg-gray-200 min-h-[300px] animate-pulse">
      <div className="p-8 h-full flex items-center justify-between">
        <div className="flex-1">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-10 w-80 mb-3" />
          <Skeleton className="h-5 w-96 mb-4" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex-shrink-0">
          <Skeleton className="h-32 w-80 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// Main Component for Homepage Promo Section
export function CardFlashSale() {
  const { data, isLoading, error } = UseGetAllFlashSales();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter active and upcoming flash sales
  const activeFlashSales =
    data?.filter((sale) => {
      if (!sale.is_active) return false;
      const now = new Date();
      const endDate = new Date(sale.end_at);
      return isAfter(endDate, now); // Not expired
    }) || [];

  const handleShopNow = (flashSale: FlashSale) => {
    console.log("Navigate to flash sale:", flashSale);
    // TODO: Navigate to flash sale products page
    // router.push(`/flash-sale/${flashSale.id}`);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activeFlashSales.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + activeFlashSales.length) % activeFlashSales.length
    );
  };

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <FlashSaleSkeleton />
        </div>
      </section>
    );
  }

  if (error || !activeFlashSales.length) {
    return null; // Don't show section if no active sales
  }

  return (
    <section className="py-8 ">
      <div className="container mx-auto ">
        {/* Main Featured Flash Sale */}
        {activeFlashSales.length > 0 && (
          <div className="relative mb-8">
            <FlashSaleBanner
              flashSale={activeFlashSales[currentIndex]}
              onShopNow={handleShopNow}
            />

            {/* Navigation arrows for main banner */}
            {activeFlashSales.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all z-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                  {activeFlashSales.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Other Flash Sales Grid */}
        {activeFlashSales.length > 1 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Flash Sale Lainnya
              </h3>
              <Button variant="outline" className="group">
                Lihat Semua
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeFlashSales.slice(1, 5).map((flashSale) => (
                <CompactFlashSaleCard
                  key={flashSale.id}
                  flashSale={flashSale}
                  onShopNow={handleShopNow}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
