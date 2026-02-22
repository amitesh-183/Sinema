import React from "react";

const Header = React.lazy(() => import("@/components/Header"));
const Main = React.lazy(() => import("@/components/Main"));

const TvShows = () => {
  return (
    <>
      <Header />
      <Main sectionTitle="Tv Shows" url={"/discover/tv"} start={0} />
    </>
  );
};

export default TvShows;
