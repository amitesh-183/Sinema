import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/api.service";
import { ApiList } from "@/types/types";
import { cn } from "@/lib/utils";
import { MovieCardSkeleton } from "../Loader";
import MovieCard from "../MovieCard";
import SectionHeader from "../SectionHeader";
import Reveal from "../Reveal";

interface PopularMoviesProps {
  category: string;
}

const PopularMovies: React.FC<PopularMoviesProps> = ({ category }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: [`/movie/${category}`],
    queryFn: () => fetchMovies(`/movie/${category}`),
    staleTime: 5 * 60 * 1000,
  });

  const movies = data?.data?.results;

  if (isError) return null;

  return (
    <Reveal>
      <section className="px-4 py-8 md:px-10 lg:px-20">
        <SectionHeader
          title={`${category.split("_").join(" ")} Movies`}
          viewAll="/movies"
        />
        <Carousel className="[&_.embla__viewport]:overflow-visible">
          {isLoading ? (
            <div className="flex gap-3 overflow-hidden py-2 sm:gap-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <MovieCardSkeleton
                  key={i}
                  className={cn("w-[120px] shrink-0 sm:w-[140px] md:w-[160px]")}
                />
              ))}
            </div>
          ) : (
            <>
              <CarouselContent className="-ml-3">
                {movies?.map((item: ApiList) => (
                  <CarouselItem
                    key={item.id}
                    className="basis-1/2 pl-3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                  >
                    <MovieCard
                      movie={item}
                      onClick={() => navigate(`/movie-info/${item.id}`)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 top-1/2 hidden bg-black/50 text-white hover:bg-black/70 md:flex" />
              <CarouselNext className="right-0 top-1/2 hidden bg-black/50 text-white hover:bg-black/70 md:flex" />
            </>
          )}
        </Carousel>
      </section>
    </Reveal>
  );
};

export default PopularMovies;
