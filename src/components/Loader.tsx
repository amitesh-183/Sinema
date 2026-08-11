import { Clapperboard } from "lucide-react";
import { cn } from "@/lib/utils";

export const PageLoader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="animate-pulse-ring rounded-2xl bg-brand-gradient p-4">
        <Clapperboard className="h-8 w-8 text-white" />
      </div>
      <p className="animate-pulse text-sm font-medium text-muted-foreground">
        Loading Sinema…
      </p>
    </div>
  );
};

export const MovieCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("rounded-2xl border border-white/10", className)}>
      <div className="skeleton-shimmer aspect-[2/3] rounded-t-2xl" />
      <div className="space-y-2 p-3">
        <div className="skeleton-shimmer h-3.5 w-3/4 rounded-full" />
        <div className="skeleton-shimmer h-3 w-1/3 rounded-full" />
      </div>
    </div>
  );
};

export const MovieGridSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
};
