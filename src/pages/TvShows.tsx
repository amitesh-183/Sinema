import React, { Suspense } from "react";

const Header = React.lazy(() => import("@/components/Header"));
const Main = React.lazy(() => import("@/components/Main"));

const TvShows = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Main sectionTitle="Tv Shows" url={"/discover/tv"} start={0} />
    </Suspense>
  );
};

export default TvShows;
