import { lazy, Suspense, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Film, Tv, Star } from "lucide-react";
import { fetchMovies } from "@/services/api.service";
import { useHead } from "@/hooks/useHead";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { tmdbImage } from "@/lib/tmdb";
import { cn } from "@/lib/utils";
import noPoster from "@/assets/no-poster.webp";
import noAvatar from "@/assets/no-poster.webp";

const Header = lazy(() => import("@/components/Header"));

const PER_PAGE = 10;

interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null;
  known_for_department: string;
  birthday: string | null;
  place_of_birth: string | null;
  popularity: number;
}

interface CreditItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  character: string;
  media_type?: string;
}

const Person = () => {
  const { personId } = useParams<{ personId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"movies" | "tv">("movies");
  const [page, setPage] = useState(1);

  const { data: personData, isLoading: personLoading } = useQuery({
    queryKey: ["/person", personId],
    queryFn: () => fetchMovies(`/person/${personId}`),
    staleTime: 5 * 60 * 1000,
  });

  const { data: movieCreditsData } = useQuery({
    queryKey: ["/person", personId, "movie_credits"],
    queryFn: () => fetchMovies(`/person/${personId}/movie_credits`),
    staleTime: 5 * 60 * 1000,
  });

  const { data: tvCreditsData } = useQuery({
    queryKey: ["/person", personId, "tv_credits"],
    queryFn: () => fetchMovies(`/person/${personId}/tv_credits`),
    staleTime: 5 * 60 * 1000,
  });

  const person: PersonDetails | undefined = personData?.data;

  useHead({
    title: person?.name,
    description: person?.biography?.slice(0, 160),
    image: person?.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : undefined,
    type: "profile",
  });

  const allMovies: CreditItem[] = useMemo(
    () =>
      (movieCreditsData?.data?.cast ?? []).sort(
        (a: CreditItem, b: CreditItem) => {
          const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
          const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
          return dateB - dateA;
        }
      ),
    [movieCreditsData]
  );

  const allTvShows: CreditItem[] = useMemo(
    () =>
      (tvCreditsData?.data?.cast ?? []).sort(
        (a: CreditItem, b: CreditItem) => {
          const dateA = a.first_air_date
            ? new Date(a.first_air_date).getTime()
            : 0;
          const dateB = b.first_air_date
            ? new Date(b.first_air_date).getTime()
            : 0;
          return dateB - dateA;
        }
      ),
    [tvCreditsData]
  );

  const activeList = activeTab === "movies" ? allMovies : allTvShows;
  const totalPages = Math.ceil(activeList.length / PER_PAGE);
  const paginatedItems = activeList.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const switchTab = (tab: "movies" | "tv") => {
    setActiveTab(tab);
    setPage(1);
  };

  const navigateToDetail = (item: CreditItem) => {
    const mediaType = item.media_type || (item.first_air_date ? "tv" : "movie");
    navigate(`/${mediaType}-info/${item.id}`);
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      {personLoading ? (
        <div className="pt-16">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
              <div className="skeleton-shimmer h-[300px] w-[200px] shrink-0 rounded-2xl sm:h-[400px] sm:w-[266px]" />
              <div className="flex w-full flex-1 flex-col items-center space-y-4 pt-4 md:items-start">
                <div className="skeleton-shimmer h-8 w-64 max-w-full rounded-lg" />
                <div className="skeleton-shimmer h-4 w-32 rounded-lg" />
                <div className="skeleton-shimmer h-4 w-48 rounded-lg" />
                <div className="space-y-2 pt-4">
                  <div className="skeleton-shimmer h-4 w-full rounded-lg" />
                  <div className="skeleton-shimmer h-4 w-full rounded-lg" />
                  <div className="skeleton-shimmer h-4 w-3/4 rounded-lg" />
                </div>
              </div>
            </div>
            <div className="mt-10 space-y-3">
              <div className="skeleton-shimmer h-6 w-48 rounded-lg" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="skeleton-shimmer aspect-[2/3] w-full rounded-2xl" />
                    <div className="skeleton-shimmer h-4 w-3/4 rounded-lg" />
                    <div className="skeleton-shimmer h-3 w-1/2 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : !person ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-16">
          <p className="text-xl text-muted-foreground">Person not found.</p>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back
          </Button>
        </div>
      ) : (
        <div className="pt-16">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            {/* hero section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8 md:flex-row"
            >
              {/* profile photo */}
              <div className="shrink-0">
                <div className="mx-auto h-[300px] w-[200px] overflow-hidden rounded-2xl border-2 border-white/10 bg-card/60 shadow-xl shadow-black/40 dark:shadow-black/40 sm:h-[400px] sm:w-[266px]">
                  <img
                    src={
                      person.profile_path
                        ? tmdbImage(person.profile_path, "w342")
                        : noAvatar
                    }
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
                  {person.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  {person.known_for_department && (
                    <span className="rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                      {person.known_for_department}
                    </span>
                  )}
                  {person.birthday && (
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {person.birthday}
                    </span>
                  )}
                  {person.place_of_birth && (
                    <span className="text-sm text-muted-foreground">
                      {person.place_of_birth}
                    </span>
                  )}
                  {person.popularity > 0 && (
                    <span className="flex items-center gap-1 text-sm text-amber-400">
                      <Star className="h-4 w-4 fill-amber-400" />
                      {Math.round(person.popularity)}
                    </span>
                  )}
                </div>
                {person.biography && (
                  <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {person.biography}
                  </p>
                )}
              </div>
            </motion.div>

            {/* tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-12 flex items-center gap-2"
            >
              <button
                onClick={() => switchTab("movies")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                  activeTab === "movies"
                    ? "bg-brand-gradient text-white shadow-lg shadow-yellow-400/25"
                    : "border border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                )}
              >
                <Film className="h-4 w-4" />
                Movies
                {allMovies.length > 0 && (
                  <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                    {allMovies.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => switchTab("tv")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                  activeTab === "tv"
                    ? "bg-brand-gradient text-white shadow-lg shadow-yellow-400/25"
                    : "border border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                )}
              >
                <Tv className="h-4 w-4" />
                TV Shows
                {allTvShows.length > 0 && (
                  <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                    {allTvShows.length}
                  </span>
                )}
              </button>
            </motion.div>

            {/* grid */}
            {paginatedItems.length > 0 && (
              <motion.div
                key={`${activeTab}-${page}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5"
              >
                {paginatedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    onClick={() => navigateToDetail(item)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-card/60 shadow-lg shadow-black/30 backdrop-blur-sm transition-shadow hover:shadow-xl hover:shadow-yellow-400/20"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={
                          item.poster_path
                            ? tmdbImage(item.poster_path, "w342")
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
                      {item.character && (
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1.5 text-center text-[10px] text-muted-foreground backdrop-blur-md sm:text-xs">
                          as{" "}
                          <span className="text-white">{item.character}</span>
                        </div>
                      )}
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
                      {(item.release_date || item.first_air_date) && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(
                            item.release_date || item.first_air_date!
                          ).getFullYear()}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeList.length === 0 && (
              <p className="mt-10 text-center text-muted-foreground">
                No {activeTab === "movies" ? "movies" : "TV shows"} found.
              </p>
            )}

            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Person;
