import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchMovies } from "@/services/api.service";
import { Genre } from "@/types/types";
import { useGenre } from "@/store/useGenre";
import { PageLoader, MovieCardSkeleton } from "@/components/Loader";
import { cn } from "@/lib/utils";

const Header = lazy(() => import("@/components/Header"));

const GRADIENTS = [
  "from-pink-500/40 to-violet-600/40",
  "from-violet-500/40 to-cyan-500/30",
  "from-cyan-500/30 to-emerald-500/30",
  "from-amber-500/30 to-pink-500/30",
];

const Genres = () => {
  const navigate = useNavigate();
  const setGenres = useGenre((state) => state.setGenreId);

  const { data, isLoading } = useQuery({
    queryKey: ["/genre/movie/list"],
    queryFn: () => fetchMovies("/genre/movie/list"),
    staleTime: 5 * 60 * 1000,
  });

  const movies = data?.data?.genres;

  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 md:px-10">
        <h1 className="font-display mb-6 text-3xl font-extrabold md:text-4xl">
          Explore by <span className="text-gradient">Genre</span>
        </h1>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <MovieCardSkeleton key={i} className="aspect-video" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies?.map((genre: Genre, i: number) => (
              <motion.button
                key={genre.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.6) }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => {
                  setGenres(genre.id);
                  navigate(`/movies/${genre.name}`);
                }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 text-left backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-pink-500/20",
                  GRADIENTS[i % GRADIENTS.length]
                )}
              >
                <span className="pointer-events-none absolute -right-3 -top-3 font-display text-6xl font-extrabold text-white/10 transition-transform duration-300 group-hover:scale-125">
                  {genre.name[0]}
                </span>
                <span className="text-base font-bold sm:text-lg">
                  {genre.name}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Genres;
