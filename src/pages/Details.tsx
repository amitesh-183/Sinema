import { lazy, Suspense, useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Languages, Play, Star, Users } from "lucide-react";
import { fetchMovies } from "@/services/api.service";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/Loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { tmdbImage } from "@/lib/tmdb";
import { cn } from "@/lib/utils";
import noPoster from "@/assets/no-poster.webp";
import noAvatar from "@/assets/no-poster.webp";

const Header = lazy(() => import("@/components/Header"));

interface Season {
  season_number: number;
  name: string;
  episode_count: number;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface SimilarMovie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  release_date?: string;
  media_type?: string;
  genre_ids?: number[];
}

const Details = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const type = useMemo(
    () => (pathname.includes("/tv") ? "tv" : "movie"),
    [pathname]
  );

  const { data, isLoading } = useQuery({
    queryKey: [`/${type}/${movieId}`],
    queryFn: () => fetchMovies(`/${type}/${movieId}`),
    staleTime: 5 * 60 * 1000,
  });

  const { data: creditsData } = useQuery({
    queryKey: [`/${type}/${movieId}/credits`],
    queryFn: () => fetchMovies(`/${type}/${movieId}/credits`),
    staleTime: 5 * 60 * 1000,
  });

  const { data: similarData } = useQuery({
    queryKey: [`/${type}/${movieId}/similar`],
    queryFn: () => fetchMovies(`/${type}/${movieId}/similar`),
    staleTime: 5 * 60 * 1000,
  });

  const movies = data?.data;
  const cast: CastMember[] = creditsData?.data?.cast?.slice(0, 20) ?? [];
  const similar: SimilarMovie[] = similarData?.data?.results ?? [];

  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [episodeCount, setEpisodeCount] = useState<number>(0);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  useEffect(() => {
    if (selectedSeason !== null && movies?.seasons) {
      const season = movies.seasons.find(
        (s: Season) => s.season_number === selectedSeason
      );
      setEpisodeCount(season?.episode_count || 0);
    }
  }, [selectedSeason, movies]);

  const title = type === "tv" ? movies?.name : movies?.original_title || movies?.title;

  const watchNow = () => {
    if (type === "tv" && selectedSeason !== null && selectedEpisode !== null) {
      navigate(
        `/player/${movieId}?season=${selectedSeason}&episode=${selectedEpisode}`
      );
    } else {
      navigate(`/player/${movies?.id}`);
    }
  };

  const navigateToDetail = (item: SimilarMovie) => {
    const mediaType = item.media_type || type;
    navigate(`/${mediaType}-info/${item.id}`);
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      {isLoading ? (
        <div>
          {/* backdrop skeleton */}
          <div className="relative h-[50vh] max-h-[560px] w-full overflow-hidden sm:h-[60vh]">
            <div className="skeleton-shimmer h-full w-full rounded-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute left-4 top-4 z-10 h-9 w-24 rounded-full border border-white/20 bg-black/40" />
          </div>

          {/* content skeleton */}
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-4 md:px-10">
            <div className="-mt-20 grid gap-6 sm:-mt-24 md:-mt-32 md:gap-8 md:grid-cols-12">
              <div className="md:col-span-3">
                <div className="skeleton-shimmer mx-auto w-28 rounded-2xl sm:w-36 md:mx-0 md:w-full md:aspect-[2/3]" />
              </div>
              <div className="md:col-span-9 space-y-4">
                <div className="skeleton-shimmer h-7 w-3/4 rounded-full sm:h-9 md:h-12" />
                <div className="skeleton-shimmer h-3.5 w-1/2 rounded-full sm:h-4" />
                <div className="mt-3 space-y-2.5">
                  <div className="skeleton-shimmer h-3.5 w-full rounded-full sm:h-4" />
                  <div className="skeleton-shimmer h-3.5 w-full rounded-full sm:h-4" />
                  <div className="skeleton-shimmer h-3.5 w-4/5 rounded-full sm:h-4" />
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <div className="skeleton-shimmer h-8 w-20 rounded-full" />
                  <div className="skeleton-shimmer h-8 w-24 rounded-full" />
                  <div className="skeleton-shimmer h-8 w-20 rounded-full" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="skeleton-shimmer h-6 w-16 rounded-full" />
                  <div className="skeleton-shimmer h-6 w-20 rounded-full" />
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="skeleton-shimmer h-12 w-36 rounded-full" />
                  <div className="skeleton-shimmer h-12 w-40 rounded-full" />
                </div>
              </div>
            </div>

            {/* cast skeleton */}
            <div className="mt-10">
              <div className="skeleton-shimmer mb-4 h-6 w-32 rounded-full" />
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="shrink-0">
                    <div className="skeleton-shimmer h-24 w-20 rounded-xl sm:h-28 sm:w-24" />
                    <div className="skeleton-shimmer mt-2 h-3 w-16 rounded-full" />
                    <div className="skeleton-shimmer mt-1 h-2.5 w-12 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* similar skeleton */}
            <div className="mt-10 pb-16">
              <div className="skeleton-shimmer mb-4 h-6 w-40 rounded-full" />
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-4 lg:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i}>
                    <div className="skeleton-shimmer aspect-[2/3] rounded-2xl" />
                    <div className="skeleton-shimmer mt-2 h-3 w-3/4 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* backdrop */}
          <div className="relative h-[50vh] max-h-[560px] min-h-[280px] w-full overflow-hidden sm:h-[60vh] sm:min-h-[320px]">
            {movies?.backdrop_path ? (
              <img
                src={tmdbImage(movies.backdrop_path, "w1280")}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-brand-gradient" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="absolute left-4 top-4 z-10 rounded-full border-white/20 bg-black/40 text-white hover:bg-black/60"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-4 md:px-10">
            {/* main info grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="-mt-20 grid gap-6 sm:-mt-24 md:-mt-32 md:gap-8 md:grid-cols-12"
            >
              {/* poster */}
              <div className="md:col-span-3">
                {movies?.poster_path && (
                  <img
                    src={tmdbImage(movies.poster_path, "w500")}
                    alt={title}
                    className="mx-auto w-28 rounded-2xl border border-white/10 shadow-2xl shadow-black/60 sm:w-36 md:mx-0 md:w-full"
                  />
                )}
              </div>

              {/* info + seasons */}
              <div className="md:col-span-9">
                <h1 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl md:text-5xl">
                  {title}
                </h1>
                {movies?.tagline && (
                  <p className="mt-1 italic text-muted-foreground">
                    {movies.tagline}
                  </p>
                )}
                <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
                  {movies?.overview}
                </p>

                {/* meta badges */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1.5 text-sm font-semibold text-amber-400">
                    <Star className="h-4 w-4 fill-amber-400" />
                    {movies?.vote_average?.toFixed(1)} ({movies?.vote_count?.toLocaleString()})
                  </span>
                  {movies?.release_date && (
                    <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" /> {movies.release_date}
                    </span>
                  )}
                  {movies?.runtime ? (
                    <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" /> {movies.runtime} min
                    </span>
                  ) : null}
                  {movies?.original_language && (
                    <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-sm capitalize text-muted-foreground">
                      <Languages className="h-4 w-4" /> {movies.original_language}
                    </span>
                  )}
                </div>

                {/* genres */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {movies?.genres?.map((g: { id: number; name: string }) => (
                    <span
                      key={g.id}
                      className="rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>

                {/* action buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="gradient" size="lg" onClick={watchNow}>
                    <Play className="mr-1 h-5 w-5 fill-current" /> Watch Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/5"
                    onClick={() => navigate(-1)}
                  >
                    Back to browsing
                  </Button>
                </div>

                {/* season selector — inline after buttons for TV */}
                {movies?.seasons && (
                  <div className="mt-6">
                    <h3 className="font-display text-base font-bold sm:text-lg">
                      Select Season
                    </h3>
                    <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
                      {movies.seasons
                        .filter((s: Season) => s.season_number > 0)
                        .map((season: Season) => (
                          <button
                            key={season.season_number}
                            onClick={() => {
                              setSelectedSeason(season.season_number);
                              setSelectedEpisode(null);
                            }}
                            className={cn(
                              "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all sm:px-5 sm:py-2",
                              selectedSeason === season.season_number
                                ? "bg-brand-gradient text-white shadow-lg shadow-pink-500/25"
                                : "bg-white/5 text-muted-foreground hover:bg-white/10"
                            )}
                          >
                            {season.name}
                          </button>
                        ))}
                    </div>

                    {selectedSeason !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-5"
                      >
                        <h3 className="font-display text-base font-bold sm:text-lg">
                          Select Episode
                        </h3>
                        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
                          {Array.from({ length: episodeCount }, (_, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedEpisode(index + 1)}
                              className={cn(
                                "rounded-xl border border-white/10 py-2 text-sm font-semibold transition-all sm:py-2.5",
                                selectedEpisode === index + 1
                                  ? "border-pink-500/60 bg-brand-gradient text-white shadow-lg shadow-pink-500/25"
                                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
                              )}
                            >
                              {index + 1}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* cast section */}
            {cast.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-10"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-500" />
                  <h2 className="font-display text-lg font-bold sm:text-xl">
                    Cast
                  </h2>
                </div>
                <div className="relative">
                  <Carousel
                    opts={{ align: "start", loop: false }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-2">
                      {cast.map((member) => (
                        <CarouselItem key={member.id} className="basis-auto pl-2 sm:basis-auto">
                          <button
                            onClick={() => navigate(`/person/${member.id}`)}
                            className="group flex flex-col items-center text-center transition-all hover:scale-105"
                          >
                            <div className="relative h-24 w-20 overflow-hidden rounded-xl border-2 border-white/10 bg-card/60 transition-all hover:border-white/30 sm:h-28 sm:w-24">
                              <img
                                src={
                                  member.profile_path
                                    ? tmdbImage(member.profile_path, "w185")
                                    : noAvatar
                                }
                                alt={member.name}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            <p className="mt-2 w-20 truncate text-xs font-semibold sm:w-24 sm:text-sm">
                              {member.name}
                            </p>
                            <p className="w-20 truncate text-[10px] text-muted-foreground sm:w-24 sm:text-xs">
                              {member.character}
                            </p>
                          </button>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-3 top-[40%] hidden h-9 w-9 border-white/20 bg-black/60 text-white backdrop-blur-md hover:bg-black/80 sm:flex" />
                    <CarouselNext className="-right-3 top-[40%] hidden h-9 w-9 border-white/20 bg-black/60 text-white backdrop-blur-md hover:bg-black/80 sm:flex" />
                  </Carousel>
                </div>
              </motion.div>
            )}

            {/* similar / suggested movies */}
            {similar.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-10 pb-16"
              >
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-5 w-1.5 rounded-full bg-brand-gradient" />
                  <h2 className="font-display text-lg font-bold sm:text-xl">
                    You might also like
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
                  {similar.slice(0, 10).map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      onClick={() => navigateToDetail(item)}
                      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-card/60 shadow-lg shadow-black/30 backdrop-blur-sm transition-shadow hover:shadow-pink-500/20"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden">
                        <img
                          src={
                            item.poster_path
                              ? tmdbImage(item.poster_path)
                              : noPoster
                          }
                          alt={item.title || item.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80" />
                        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
                          <Star className="h-3 w-3 fill-amber-300" />
                          {item.vote_average?.toFixed(1)}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <div className="rounded-xl bg-brand-gradient px-3 py-2 text-center text-sm font-bold text-white">
                            View Details
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="truncate text-sm font-semibold">
                          {item.title || item.name}
                        </h4>
                        {item.release_date && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {new Date(item.release_date).getFullYear()}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Details;
