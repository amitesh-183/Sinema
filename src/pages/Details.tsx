import { BsFillPlayFill } from "react-icons/bs";
import Header from "@/components/Header";
import useDetails from "@/hooks/useDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";

const Details = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const type = useMemo(
    () => (pathname.includes("/tv") ? "tv" : "movie"),
    [pathname]
  );

  const { apiList } = useDetails(`/${type}/${movieId}`);

  const runtime = useMemo(() => {
    if (apiList?.runtime) {
      const hours = Math.floor(apiList.runtime / 60);
      const minutes = apiList.runtime % 60;
      return `${hours}h ${minutes}m`;
    }
    return "";
  }, [apiList]);

  // show revenue in crores
  const revenue = useMemo(() => {
    if (apiList?.revenue) {
      const revenueInCrores = (apiList.revenue / 1000000000).toFixed(2);
      return revenueInCrores;
    }
    return "";
  }, [apiList]);

  return (
    <>
      <Header extraClasses="border-b-0" />
      <div>
        <div className="backdrop-img relative">
          <div className="absolute inset-0 dark:bg-gradient-to-t from-background via-transparent to-background"></div>
          <div className="absolute inset-0 dark:bg-background/30"></div>
          {apiList?.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${apiList.backdrop_path}`}
              alt={type === "tv" ? apiList.name : apiList.original_title}
              className="2xl:[700px] md:h-[560px] h-[300px] w-full"
            />
          )}
        </div>
        <div className="absolute md:top-80 w-full top-40">
          <div className="lg:px-20 md:px-10 px-4 flex md:flex-row flex-col gap-8 py-6">
            <div className="poster-area">
              {apiList?.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${apiList.poster_path}`}
                  alt=""
                  className="md:h-[360px] h-[240px] md:min-w-[300px] md:max-w-[420px] w-[200px] rounded-lg"
                />
              )}
            </div>
            <div className="details-area 2xl:max-w-4xl md:max-w-2xl w-full">
              <h2 className="font-semibold md:text-4xl text-3xl text-white">
                {type === "tv" ? apiList?.name : apiList?.original_title}
              </h2>
              <p className="py-3 md:text-xl text-base text-white">
                {apiList?.overview}
              </p>
              <ul className="flex items-center gap-4 sm:w-fit w-[90%] hide-scroll overflow-x-auto">
                {apiList?.genres?.map((genre: { id: number; name: string }) => (
                  <li
                    key={genre.id}
                    className="bg-muted/60 border text-nowrap border-slate-700 px-4 py-1 rounded-xl"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
              <div className="py-4">
                <p className="py-1 font-semibold">
                  Release Date : {apiList?.release_date}
                </p>
                <p className="py-1 font-semibold">Time : {runtime}</p>
                <p className="py-1 font-semibold">
                  Language :{" "}
                  {apiList?.original_language === "en"
                    ? "English"
                    : apiList?.original_language}
                </p>
                <p className="py-1 font-semibold">Revenue : {revenue}Cr.</p>
              </div>
            </div>
          </div>
          <div className="lg:px-20 md:px-10 px-4 flex md:gap-4 gap-2 ms:py-8 pb-2">
            <button className="lg:px-10 px-4 bg-muted/50 font-bold md:text-lg text-sm flex items-center md:gap-2 gap-1 rounded-lg py-3">
              <BsFillPlayFill className="md:w-[20px]" />
              Watch Trailer
            </button>
            <button
              className="lg:px-10 px-4 bg-pink-600 font-bold md:text-lg text-sm flex items-center md:gap-2 gap-1 rounded-lg py-3"
              onClick={() => navigate(`/player/${apiList?.id}`)}
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
