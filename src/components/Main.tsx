import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/api.service";
import { ApiList } from "@/types/types";
import { MovieGridSkeleton } from "@/components/Loader";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";

type Props = {
  sectionTitle: string;
  url: string;
  start?: number;
  end?: number;
  genreId?: number;
  searchQuery?: string;
};

const Main: React.FC<Props> = ({
  sectionTitle,
  url,
  genreId,
  searchQuery,
  start = 0,
  end,
}) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [url, genreId, searchQuery, page],
    queryFn: () => fetchMovies(url, genreId, searchQuery, page),
    staleTime: 5 * 60 * 1000,
  });

  const movies = data?.data?.results;
  const totalPages = Math.min(data?.data?.total_pages ?? 1, 500);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const effectiveEnd = end ?? movies?.length;

  useEffect(() => {
    setPage(1);
  }, [url, genreId, searchQuery]);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 md:px-10">
      <div className="mb-6 flex items-center gap-3">
        <Link
          to="/"
          aria-label="Back to home"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <h1 className="font-display text-xl font-bold tracking-tight md:text-2xl">
          {sectionTitle}
        </h1>
        {!isLoading && !isError && data?.data?.total_results ? (
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">
            {data.data.total_results.toLocaleString()} titles
          </span>
        ) : null}
      </div>

      {isError ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <p className="text-muted-foreground">
            Couldn't load titles right now.
          </p>
        </div>
      ) : isLoading ? (
        <MovieGridSkeleton count={12} />
      ) : (
        <>
          <div
            className={`grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 ${
              isFetching ? "opacity-50 transition-opacity" : ""
            }`}
          >
            {movies?.slice(start, effectiveEnd).map((movie: ApiList, i: number) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.6) }}
              >
                <MovieCard
                  movie={movie}
                  onClick={() =>
                    navigate(
                      `/${pathname.includes("/tv") || movie.media_type === "tv"
                        ? "tv"
                        : "movie"
                      }-info/${movie.id}`
                    )
                  }
                />
              </motion.div>
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
};

export default Main;
