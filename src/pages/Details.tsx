import { lazy, Suspense, useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Languages, Play, Star } from "lucide-react";
import { fetchMovies } from "@/services/api.service";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/Loader";
import { tmdbImage } from "@/lib/tmdb";
import { cn } from "@/lib/utils";

const Header = lazy(() => import("@/components/Header"));

interface Season {
  season_number: number;
  name: string;
  episode_count: number;
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

  const movies = data?.data;

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

  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      {isLoading ? (
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="skeleton-shimmer h-[380px] w-full rounded-3xl" />
          <div className="mt-8 flex gap-6">
            <div className="skeleton-shimmer h-[320px] w-56 shrink-0 rounded-2xl" />
            <div className="flex-1 space-y-4">
              <div className="skeleton-shimmer h-8 w-2/3 rounded-full" />
              <div className="skeleton-shimmer h-4 w-full rounded-full" />
              <div className="skeleton-shimmer h-4 w-5/6 rounded-full" />
              <div className="skeleton-shimmer h-4 w-1/2 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="relative h-[60vh] max-h-[560px] min-h-[320px] w-full overflow-hidden">
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

          <div className="relative mx-auto w-full max-w-6xl px-4 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="-mt-32 grid gap-8 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                {movies?.poster_path && (
                  <img
                    src={tmdbImage(movies.poster_path, "w500")}
                    alt={title}
                    className="w-40 rounded-2xl border border-white/10 shadow-2xl shadow-black/60 md:w-full"
                  />
                )}
              </div>
              <div className="md:col-span-9">
                <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">
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
              </div>
            </motion.div>

            {movies?.seasons && (
              <div className="mt-10 pb-16">
                <h3 className="font-display text-xl font-bold">
                  Select Season
                </h3>
                <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
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
                          "shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all",
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
                    className="mt-8"
                  >
                    <h3 className="font-display text-xl font-bold">
                      Select Episode
                    </h3>
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
                      {Array.from({ length: episodeCount }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedEpisode(index + 1)}
                          className={cn(
                            "rounded-xl border border-white/10 py-2.5 text-sm font-semibold transition-all",
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
        </div>
      )}
    </Suspense>
  );
};

export default Details;
