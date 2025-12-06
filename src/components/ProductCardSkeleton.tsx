import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Image Skeleton */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Skeleton className="h-full w-full" />
        {/* Discount badge skeleton */}
        <Skeleton className="absolute top-3 left-3 h-6 w-16 rounded-full" />
      </div>
      
      {/* Content Skeleton */}
      <div className="p-3 sm:p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />
        
        {/* Description */}
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-14" />
        </div>
        
        {/* Button */}
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
};
