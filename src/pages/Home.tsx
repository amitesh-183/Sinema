import { AlertTriangle } from "lucide-react";
import React, { Suspense } from "react";
import Marquee from "react-fast-marquee";

const Footer = React.lazy(() => import("@/components/Footer"));
const Header = React.lazy(() => import("@/components/Header"));
const HeroSection = React.lazy(() =>
  import("@/components/HeroSection")
);
const PopularMovies = React.lazy(() =>
  import("@/components/Home/PopularMovies")
);
const Tv = React.lazy(() => import("@/components/Home/Tv"));

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Marquee className="w-full absolute top-16 bg-red-500 z-50">
        <h6 className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Notice: If you can't see movies or get a blank screen, please change
          your DNS settings or use a VPN for full access.
        </h6>
      </Marquee>
      {/* <QuickSearch /> */}
      <Header extraClasses="fixed top-0 border-b-0 z-20 backdrop-blur-sm" />
      <div className="grid md:min-h-screen h-[800px] w-full md:grid-cols-auto">
        <HeroSection url={"/movie/upcoming"} />
      </div>
      {/* Popular movie list */}
      <PopularMovies category={"now_playing"} />
      <PopularMovies category={"upcoming"} />
      <PopularMovies category={"popular"} />
      <Tv />
      <PopularMovies category={"top_rated"} />
      <Footer />
    </Suspense>
  );
}

export default Home