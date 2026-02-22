import { BsFillPlayFill } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/api.service";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
const Header = React.lazy(() => import("@/components/Header"));



const Details = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const type = useMemo(
    () => (pathname.includes("/tv") ? "tv" : "movie"),
    [pathname]
  );


  const { data } = useQuery({
    queryKey: [`/${type}/${movieId}`],
    queryFn: () => fetchMovies(`/${type}/${movieId}`),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const movies = data?.data;

  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [episodeCount, setEpisodeCount] = useState<number>(0);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  useEffect(() => {
    if (selectedSeason !== null && movies?.seasons) {
      const season = movies.seasons.find(
        (season: any) => season.season_number === selectedSeason
      );
      if (season) {
        setEpisodeCount(season.episode_count || 0);
      } else {
        setEpisodeCount(0);
      }
    }
  }, [selectedSeason, movies]);

  return (
    <>
      <Header extraClasses="border-b-0" />
      <div>
        <div className="backdrop-img relative">
          <div className="absolute inset-0 dark:bg-gradient-to-t from-background via-transparent to-background"></div>
          <div className="absolute inset-0 dark:bg-background/30"></div>
          {movies?.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
              alt={type === "tv" ? movies.name : movies.original_title}
              className="2xl:[900px] md:h-[700px] h-[300px] w-full object-cover"
            />
          )}
        </div>
        <div>
        </div>
        <div className="absolute md:top-96 w-full left-0 top-40">
          <div className="xl:px-20 md:px-10 px-4 grid md:grid-cols-12 grid-cols-1 gap-4 py-6">
            <div className="flex gap-4 md:flex-row flex-col lg:col-span-8 col-span-12">
              <div className="poster-area">
                {movies?.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                    alt=""
                    className="md:h-[360px] h-[240px] md:min-w-[230px] md:max-w-[370px] w-[180px] rounded-lg"
                  />
                )}
              </div>
              <div className="details-area w-full">
                <div className="flex items-end">
                  <Button onClick={() => navigate(-1)} className="p-0 px-2 h-8 mr-4 hover:bg-transparent hover:scale-105 duration-200" variant={"ghost"}><ArrowLeft /></Button>
                  <h2 className="font-semibold md:text-4xl text-3xl text-white">
                    {type === "tv" ? movies?.name : movies?.original_title}
                  </h2>
                </div>
                <p className="py-3 md:text-xl text-base text-white">
                  {movies?.overview}
                </p>
                <ul className="flex items-center gap-4 sm:w-fit w-full  hide-scroll overflow-x-auto">
                  {movies?.genres?.map(
                    (genre: { id: number; name: string }) => (
                      <li
                        key={genre.id}
                        className="bg-muted/60 border text-nowrap border-slate-700 px-4 py-1 rounded-xl"
                      >
                        {genre.name}
                      </li>
                    )
                  )}
                </ul>
                <div className="py-4">
                  {movies?.release_date && (
                    <p className="py-1 font-semibold">
                      Release Date : {movies?.release_date}
                    </p>
                  )}
                  <p className="py-1 font-semibold">Time : {movies?.runtime}</p>
                  <p className="py-1 font-semibold">
                    Language :{" "}
                    {movies?.original_language === "en"
                      ? "English"
                      : movies?.original_language}
                  </p>
                  {movies?.revenue && (
                    <p className="py-1 font-semibold">Revenue : {movies?.revenue}Cr.</p>
                  )}
                </div>
              </div>
            </div>
            {movies?.seasons && (
              <div className="lg:col-span-4 col-span-12">
                <h3 className="font-medium md:text-2xl text-xl text-white">
                  Select Season
                </h3>
                <ul className="flex flex-wrap gap-4 mt-4">
                  {movies?.seasons?.map(
                    (season: { season_number: number; name: string }) => (
                      <li
                        key={season.season_number}
                        className={`cursor-pointer px-4 rounded-lg ${selectedSeason === season.season_number
                          ? "bg-pink-600 border text-nowrap border-slate-700 px-4 py-1 rounded-xl"
                          : "bg-muted/60 border text-nowrap border-slate-700 px-4 py-1 rounded-xl"
                          }`}
                        onClick={() => {
                          setSelectedSeason(season.season_number);
                          setSelectedEpisode(null); // Reset the selected episode
                        }}
                      >
                        {season.name}
                      </li>
                    )
                  )}
                </ul>
                {selectedSeason !== null && (
                  <div className="mt-6">
                    <h3 className="font-medium md:text-2xl text-xl text-white">
                      Select Episode
                    </h3>
                    <ul className="flex flex-wrap gap-4 mt-4">
                      {Array.from({ length: episodeCount }, (_, index) => (
                        <li
                          key={index}
                          className={`cursor-pointer border text-nowrap w-fit border-slate-700 px-4 py-1 rounded-xl ${selectedEpisode === index + 1
                            ? "bg-pink-600"
                            : " bg-muted/60"
                            }`}
                          onClick={() => setSelectedEpisode(index + 1)}
                        >
                          Episode {index + 1}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="lg:px-20 md:px-10 px-4 flex md:gap-4 gap-2 ms:py-8 pb-2">
            <button className="lg:px-10 px-4 bg-muted/50 font-bold md:text-lg text-sm flex items-center md:gap-2 gap-1 rounded-lg py-3">
              <BsFillPlayFill className="md:w-[20px]" />
              Watch Trailer
            </button>
            <button
              className="lg:px-10 px-4 bg-pink-600 font-bold md:text-lg text-sm flex items-center md:gap-2 gap-1 rounded-lg py-3"
              onClick={() => {
                if (
                  type === "tv" &&
                  selectedSeason !== null &&
                  selectedEpisode !== null
                ) {
                  navigate(
                    `/player/${movieId}?season=${selectedSeason}&episode=${selectedEpisode}`
                  );
                } else {
                  navigate(`/player/${movies?.id}`);
                }
              }}
            >
              <BsFillPlayFill className="md:w-[20px]" />
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
