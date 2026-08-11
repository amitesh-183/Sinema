import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/api.service";
import { ApiList } from "@/types/types";
import { cn } from "@/lib/utils";
import { MovieCardSkeleton } from "../Loader";
import MovieCard from "../MovieCard";
import SectionHeader from "../SectionHeader";
import Reveal from "../Reveal";

const Tv = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["/tv/popular"],
    queryFn: () => fetchMovies("/tv/popular"),
    staleTime: 5 * 60 * 1000,
  });

  const movies = data?.data?.results;

  return (
    <Reveal>
      <section className="px-4 py-8 md:px-10 lg:px-20">
        <SectionHeader title="Popular TV Shows" viewAll="/tv-series" />
      <Carousel>
        {isLoading ? (
          <div className="flex gap-4 overflow-hidden py-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <MovieCardSkeleton
                key={i}
                className={cn("w-[140px] shrink-0 sm:w-[160px]")}
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
                    onClick={() => navigate(`/tv-info/${item.id}`)}
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

export default Tv;
