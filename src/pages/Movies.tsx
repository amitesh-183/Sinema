import { useGenre } from "@/store/useGenre";
import React, { Suspense } from "react";
import { useParams } from "react-router-dom";

const Header = React.lazy(() => import("@/components/Header"));
const Main = React.lazy(() => import("@/components/Main"));

const Movies = () => {
  const { genre } = useParams();
  const genres = useGenre((state: any) => state.genres);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Header />
        {genre ? (
          <Main
            sectionTitle={"Movies : " + genre}
            url={`/discover/movie`}
            genreId={genres !== null ? genres : undefined}
            start={0}
          />
        ) : (
          <Main
            sectionTitle={"Movies"}
            url={`/discover/movie`}
            genreId={genres !== null ? genres : undefined}
            start={0}
          />
        )}
      </div>
    </Suspense>
  );
};

export default Movies;
