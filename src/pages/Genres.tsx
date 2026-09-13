import { lazy, Suspense } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { fetchMovies } from "@/services/api.service";
import { Genre } from "@/types/types";
import { useGenre } from "@/store/useGenre";
import { useHead } from "@/hooks/useHead";
import { GenreCardSkeleton, PageLoader } from "@/components/Loader";

const Header = lazy(() => import("@/components/Header"));

const Genres = () => {
  useHead({ title: "Genres" });
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
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-4 sm:py-8 md:px-10">
        <h1 className="font-display mb-5 text-2xl font-extrabold sm:mb-6 sm:text-3xl md:text-4xl">
          Explore by <span className="text-gradient">Genre</span>
        </h1>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <GenreCardSkeleton key={i} />
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
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-yellow-400/20"
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
