import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noPoster from "../assets/no-poster.webp";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/api.service";
import { ChevronLeft } from "lucide-react";
import { ApiList } from "@/types/types";

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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [url, genreId, searchQuery],
    queryFn: () => fetchMovies(url, genreId, searchQuery),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const movies = data?.data?.results;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const effectiveEnd = end !== undefined ? end : movies?.length;

  return (
    <main className="flex flex-1 flex-col md:p-4 p-2 lg:p-6 w-full">
      <div className="flex items-center">
        <Link to="/" className="mr-1 mt-1"><ChevronLeft /></Link>
        <h1 className="text-lg font-semibold md:text-2xl">{sectionTitle}</h1>
      </div>
      <div>
        {isError ? <p>{error.message}</p>
          : isLoading ? (
            <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 grid-cols-3 md:gap-4 gap-0">
              {new Array(10 - start).fill(null).map((_, index) => (
                <div
                  key={index}
                  className="p-2 border border-slate-800/20 shadow-xl rounded-xl"
                >
                  <Skeleton className="w-full md:h-[300px] h-[160px]" />
                  <h4 className="font-bold text-xl text-ellipsis text-nowrap w-full overflow-hidden py-4">
                    <Skeleton className="h-4 w-full" />
                  </h4>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 grid-cols-3 md:gap-4 gap-0">
              {movies.slice(start, effectiveEnd).map((movie: ApiList) => (
                <div
                  key={movie.id}
                  onClick={() =>
                    navigate(
                      `/${pathname.includes("/tv") || movie.media_type === "tv"
                        ? "tv"
                        : "movie"
                      }-info/${movie.id}`
                    )
                  }
                  className=" hover:brightness-125 scale-[0.99] hover:scale-[1] duration-300 py-2 px-1 rounded-xl"
                >
                  <img
                    className=" w-full 2xl:h-full xl:h-[300px] lg:h-[280px] object-cover md:h-[360px] sm:h-[300px] h-[160px]"
                    src={`${movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : noPoster
                      }`}
                    alt={movie.title || movie.name}
                  />
                  <div className="px-2 w-full">
                    <h4 className="font-semibold text-base py-2 text-ellipsis text-nowrap overflow-hidden">
                      {url.includes("tv") ? movie.name : movie.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </main>
  );
};

export default Main;
