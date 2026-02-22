import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/api.service";
import { ApiList } from "@/types/types";

const Tv = () => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: [`/tv/popular`],
    queryFn: () => fetchMovies(`/tv/popular`),
    staleTime: 5 * 60 * 1000,
  });

  const movies = data?.data?.results;

  return (
    <div>
      {/*  */}
      <div className="flex flex-col md:py-8 pt-6 lg:px-20 md:px-10 sm:px-4 px-2">
        <div className="flex items-center justify-between">
          <h4 className=" font-bold sm:text-2xl text-lg">Popular Tv Shows</h4>
          <Link to={"/tv-series"} className="sm:text-base text-xs">
            View All
          </Link>
        </div>
        <Carousel className="">
          <CarouselContent className="pt-4">
            {movies?.map((item: ApiList) => (
              <CarouselItem
                key={item.id}
                className="basis-1/3 xl:basis-40 md:basis-1/6 sm:basis-1/4 sm:pl-2 pl-1 hover:scale-105 duration-300 ease-in-out"
              >
                <div className="p-0">
                  <Card
                    onClick={() => navigate(`/tv-info/${item.id}`)}
                    className="cursor-pointer rounded-none border-none"
                  >
                    <CardContent className="flex aspect-auto items-center justify-center p-0">
                      <span className="text-4xl font-semibold">
                        <img
                          src={
                            "https://image.tmdb.org/t/p/original" +
                            item.poster_path
                          }
                          alt={item.title}
                          className="w-full object-cover sm:h-[210px] h-[180px]"
                        />
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-5 top-1/2 md:flex hidden" />
          <CarouselNext className="-right-5 top-1/2 md:flex hidden" />
        </Carousel>
      </div>
    </div>
  );
};

export default Tv;
