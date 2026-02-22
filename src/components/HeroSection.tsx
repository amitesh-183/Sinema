import { BiSearch } from "react-icons/bi";
import imdb from "../assets/imdb.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/api.service";
import { useSearch } from "@/store/useSearch";

type Props = {
  url: string;
};

const HeroSection: React.FC<Props> = ({ url }) => {
  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => fetchMovies(url),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  const searchRef = useRef(null);
  const navigate = useNavigate();
  // const { searchQuery, setSearchQuery } = useSearch();

  const searchQuery = useSearch((state) => state.searchQuery);
  const setSearchQuery = useSearch((state) => state.setSearchQuery);

  const plugin = useRef(Autoplay({ delay: 2000 }));

  const movies = data?.data?.results;

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/search/${searchQuery}`);
    console.log(searchQuery);
  };

  const handleSearchPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <div className=" absolute dark:text-white z-10 w-full top-[18%] left-1/2 flex justify-center translate-x-[-50%] translate-y-[-50%]">
        <div className="flex flex-col gap-2 justify-center items-center">
          <h2 className="text-3xl font-bold">Blink Search</h2>
          <div className="searchBox">
            <input
              className="searchInput"
              type="text"
              name=""
              value={searchQuery || ""}
              onChange={handleSearchInputChange}
              placeholder="search movies/tv-shows/genres..."
              onKeyUp={handleSearchPress}
            />
            <button
              type="submit"
              title="search"
              ref={searchRef}
              className="searchButton"
              onClick={handleSearch}
            >
              <BiSearch className="w-7 h-7 translate-x-1" />
            </button>
          </div>
        </div>
      </div>
      <Carousel
        plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="p-0 m-0"
      >
        <CarouselContent>
          {movies?.map((item) => (
            <CarouselItem key={item.id} className="p-0 m-0 border-0">
              <div className="">
                <Card className="border-none">
                  <CardContent className="flex md:h-screen h-[96vh] w-full p-0 text-white items-center justify-center relative">
                    <div className="bg-black/30 absolute inset-0"></div>
                    <div className="absolute inset-0 dark:bg-gradient-to-t from-background via-transparent to-background"></div>
                    <div className="absolute inset-0 dark:bg-gradient-to-r from-background to-transparent"></div>
                    <div className="absolute md:left-20 left-10 md:bottom-[30%] bottom-[26%] md:w-[70%] w-[80%]">
                      <h1 className="font-black md:text-7xl text-4xl py-6">
                        {item.title}
                      </h1>
                      <p className="max-w-2xl">
                        {item.overview.length > 160 ? (
                          <>
                            {item.overview.slice(0, 160)}
                            <span className="text-pink-500 cursor-pointer">
                              {" "}
                              show more
                            </span>
                          </>
                        ) : (
                          item.overview
                        )}
                      </p>
                      <div className="py-2 flex items-center gap-2">
                        <img src={imdb} alt="imdb" className="w-10 h-10" />
                        {item.vote_average}({item.vote_count})
                        <div>
                          <p>{item.release_date}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button variant={"outline"} className="bg-black">
                          Watch Trailer
                        </Button>
                        {/* <Button className="bg-pink-700 text-white flex gap-1 items-center">
                          <BiPlay className="w-6 h-6" />
                          Watch Now
                        </Button> */}
                      </div>
                    </div>
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        item.backdrop_path
                      }
                      alt={item.title}
                      className="w-full md:object-fill object-cover h-full"
                    />
                    <span className="text-4xl font-semibold">{item.name}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex absolute bottom-2 my-3 md:ms-auto md:mx-0 md:w-fit w-full mx-auto md:right-4 z-10">
        <Carousel className="md:max-w-4xl sm:max-w-sm max-w-[300px] md:ms-auto mx-auto">
          <CarouselContent className="pt-10">
            {movies?.map((item) => (
              <CarouselItem
                key={item.id}
                className="md:basis-1/5 basis-1/3 hover:scale-105 z-30 duration-300 ease-in-out"
              >
                <div className="p-1">
                  <Card
                    onClick={() => navigate(`/movie-info/${item.id}`)}
                    className="cursor-pointer rounded-none"
                  >
                    <CardContent className="flex aspect-auto items-center justify-center p-0">
                      <span className="text-4xl font-semibold">
                        <img
                          src={
                            "https://image.tmdb.org/t/p/original" +
                            item.poster_path
                          }
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default HeroSection;
