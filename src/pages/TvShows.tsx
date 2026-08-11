import { lazy, Suspense } from "react";
import { PageLoader } from "@/components/Loader";

const Header = lazy(() => import("@/components/Header"));
const Main = lazy(() => import("@/components/Main"));

const TvShows = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      <Main sectionTitle="TV Shows" url="/discover/tv" start={0} />
    </Suspense>
  );
};

export default TvShows;
