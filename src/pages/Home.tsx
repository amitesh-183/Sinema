// import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
// import MovieGenreList from "@/components/Home/MovieGenreList";
import PopularMovies from "@/components/Home/PopularMovies";
import Tv from "@/components/Home/Tv";
import { AlertTriangle } from "lucide-react";
import Marquee from "react-fast-marquee";

export function Home() {
  return (
    <>
      <Marquee className="w-full absolute top-14 bg-red-500 z-50">
        <h6 className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Notice: If you can't see movies or get a blank screen, please change
          your DNS settings or use a VPN for full access.
        </h6>
      </Marquee>
      {/* <QuickSearch /> */}
      <Header extraClasses="sticky top-0 border-b-0 z-20 backdrop-blur-sm" />
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
    </>
  );
}
