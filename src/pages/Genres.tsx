import { fetchMovies } from "@/services/api.service";
import { Genre } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
const Header = React.lazy(() => import("@/components/Header"));


const Genres = () => {

  const { data } = useQuery({
    queryKey: ["/genre/movie/list"],
    queryFn: () => fetchMovies(`/genre/movie/list`),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const movies = data?.data?.genres;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <div className="flex flex-col md:px-10 px-4">
        <main className="m-4">
          <h1 className="text-2xl font-semibold">Genres</h1>
          <ul className="grid xl:grid-cols-5 grid-cols-2 gap-8 mt-4">
            {movies?.map((genre: Genre) => (
              <li
                key={genre.id}
                className="md:w-[200px] w-full border py-4 px-6 rounded-lg"
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Suspense>

  );
};

export default Genres;
