import Header from "@/components/Header";
import Main from "@/components/Main";
import { useGenre } from "@/store/useGenre";
import { useParams } from "react-router-dom";

const Movies = () => {
  const { genre } = useParams();
  const genres = useGenre((state: any) => state.genres);
  return (
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
  );
};

export default Movies;
