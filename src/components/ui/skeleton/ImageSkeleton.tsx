import { Skeleton } from "@/components/ui/skeleton";

export function ImageSkeleton() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Skeleton className="w-full h-60 rounded-md" />
    </div>
  );
}
