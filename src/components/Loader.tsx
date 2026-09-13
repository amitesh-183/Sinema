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
    <div
      aria-hidden="true"
      className={cn("overflow-hidden rounded-2xl border border-white/10 bg-card/60", className)}
    >
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
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const MovieCarouselSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="flex gap-3 overflow-hidden py-2 sm:gap-4" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton
          key={i}
          className="w-[calc((100%-0.75rem)/2)] shrink-0 sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-4rem)/5)] xl:w-[calc((100%-5rem)/6)]"
        />
      ))}
    </div>
  );
};

export const GenreCardSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="relative min-h-[104px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <div className="skeleton-shimmer h-5 w-3/5 rounded-full sm:h-6" />
    </div>
  );
};

export const HeroSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="relative h-[100dvh] min-h-[420px] w-full overflow-hidden sm:h-[calc(100dvh-3rem)] sm:min-h-[560px]"
    >
      <div className="skeleton-shimmer h-full w-full rounded-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-x-4 bottom-24 mx-auto max-w-5xl sm:bottom-32 md:bottom-32 lg:inset-x-12 lg:left-20 lg:mx-0">
        <div className="skeleton-shimmer mb-3 h-4 w-24 rounded-full" />
        <div className="skeleton-shimmer h-8 w-4/5 max-w-xl rounded-full sm:h-10 md:h-14" />
        <div className="mt-3 space-y-2">
          <div className="skeleton-shimmer h-3 w-full max-w-xl rounded-full sm:h-4" />
          <div className="skeleton-shimmer h-3 w-3/4 max-w-lg rounded-full sm:h-4" />
        </div>
        <div className="mt-4 flex gap-3">
          <div className="skeleton-shimmer h-6 w-16 rounded-full" />
          <div className="skeleton-shimmer h-6 w-24 rounded-full" />
        </div>
        <div className="mt-5 flex gap-3">
          <div className="skeleton-shimmer h-11 w-32 rounded-full" />
          <div className="skeleton-shimmer h-11 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
};
