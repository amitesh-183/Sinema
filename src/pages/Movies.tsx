import { lazy, Suspense } from "react";
import { useParams } from "react-router";
import { useGenre } from "@/store/useGenre";
import { PageLoader } from "@/components/Loader";

const Header = lazy(() => import("@/components/Header"));
const Main = lazy(() => import("@/components/Main"));

const Movies = () => {
  const { genre } = useParams();
  const genres = useGenre((state) => state.genres);
  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      <Main
        sectionTitle={genre ? `Movies : ${genre}` : "Movies"}
        url="/discover/movie"
        genreId={genres ?? undefined}
        start={0}
      />
    </Suspense>
  );
};

export default Movies;
