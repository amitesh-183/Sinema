import { useRef } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { Play, Sparkles, Star, TrendingUp } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { fetchMovies } from "@/services/api.service";
import { useSearch } from "@/store/useSearch";
import { ApiList } from "@/types/types";
import { tmdbImage } from "@/lib/tmdb";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
};

const HeroSection: React.FC<Props> = ({ url }) => {
  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => fetchMovies(url),
    staleTime: 5 * 60 * 1000,
  });
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  const searchQuery = useSearch((state) => state.searchQuery);
  const setSearchQuery = useSearch((state) => state.setSearchQuery);

  const plugin = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));

  const movies = data?.data?.results;

  const handleSearch = () => {
    if (!searchQuery?.trim()) return;
    navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSearchPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -left-24 top-10 h-80 w-80 rounded-full bg-pink-600/25 blur-[100px]" />
        <div
          className="animate-blob absolute right-0 top-1/3 h-96 w-96 rounded-full bg-violet-600/25 blur-[110px]"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="animate-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/15 blur-[90px]"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      {/* search overlay */}
      <div className="absolute left-1/2 z-20 w-full -translate-x-1/2 px-4 pt-14 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex w-full max-w-2xl flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
            <Sparkles className="h-3 w-3" /> Now Streaming
          </div>
          <h2 className="font-display text-center text-2xl font-extrabold sm:text-3xl md:text-5xl">
            Your next <span className="text-gradient">obsession</span>
            <br className="hidden sm:block" /> starts here
          </h2>
          <div className="searchBox mt-2">
            <input
              className="searchInput"
              type="text"
              ref={searchRef}
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, TV shows, genres…"
              onKeyUp={handleSearchPress}
            />
            <button
              type="submit"
              title="search"
              className="searchButton"
              onClick={handleSearch}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* main hero carousel */}
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="group/carousel"
      >
        <CarouselContent className="m-0">
          {movies?.map((item: ApiList, i: number) => (
            <CarouselItem key={item.id} className="p-0">
              <div className="relative h-[100dvh] min-h-[420px] w-full overflow-hidden sm:h-[calc(100dvh-4rem)] sm:min-h-[560px]">
                <img
                  src={tmdbImage(item.backdrop_path, "w1280")}
                  alt={item.title || item.name}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-24 z-10 mx-auto max-w-5xl sm:bottom-32 md:bottom-32 lg:inset-x-12 lg:left-20 lg:mx-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45 }}
                      className="max-w-2xl"
                    >
                      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-pink-500">
                        <TrendingUp className="h-4 w-4" />
                        {item.release_date?.slice(0, 4) || "Trending"}
                      </div>
                      <h1 className="font-display text-2xl font-extrabold leading-tight sm:text-4xl md:text-6xl">
                        {item.title || item.name}
                      </h1>
                      <p className="mt-3 line-clamp-3 max-w-xl text-sm text-muted-foreground md:text-base">
                        {item.overview}
                      </p>
                      <div className="mt-4 flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1 font-semibold text-amber-400">
                          <Star className="h-4 w-4 fill-amber-400" />
                          {item.vote_average?.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">
                          {item.vote_count?.toLocaleString()} votes
                        </span>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button
                          variant="gradient"
                          size="lg"
                          onClick={() => navigate(`/player/${item.id}`)}
                        >
                          <Play className="mr-1 h-5 w-5 fill-current" />
                          Watch Now
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => navigate(`/movie-info/${item.id}`)}
                          className="bg-black/40 text-white hover:bg-black/60"
                        >
                          More Info
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* thumbnail strip */}
      <div className="absolute inset-x-0 bottom-4 z-10 ml-auto lg:block w-full max-w-4xl px-4 hidden">
        <Carousel className="ml-auto max-w-4xl">
          <CarouselContent className="-ml-2">
            {movies?.map((item: ApiList) => (
              <CarouselItem
                key={item.id}
                className={cn("basis-1/3 pl-2 sm:basis-1/5 lg:basis-1/4")}
              >
                <div className="p-0.5">
                  <Card
                    onClick={() => navigate(`/movie-info/${item.id}`)}
                    className={cn(
                      "cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-pink-500/60",
                    )}
                  >
                    <CardContent className="p-0">
                      <img
                        src={tmdbImage(item.poster_path, "w185")}
                        alt={item.title || item.name}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[2/3] w-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70" />
          <CarouselNext className="right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70" />
        </Carousel>
      </div>
    </section>
  );
};

export default HeroSection;
