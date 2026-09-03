import { lazy, Suspense } from "react";
import { PageLoader } from "@/components/Loader";
import { useHead } from "@/hooks/useHead";

const Header = lazy(() => import("@/components/Header"));
const HeroSection = lazy(() => import("@/components/HeroSection"));
const PopularMovies = lazy(() => import("@/components/Home/PopularMovies"));
const Tv = lazy(() => import("@/components/Home/Tv"));
const Footer = lazy(() => import("@/components/Footer"));

const Home = () => {
  useHead();
  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      <HeroSection url="/movie/upcoming" />
      <PopularMovies category="now_playing" />
      <PopularMovies category="upcoming" />
      <PopularMovies category="popular" />
      <Tv />
      <PopularMovies category="top_rated" />
      <Footer />
    </Suspense>
  );
};

export default Home;
