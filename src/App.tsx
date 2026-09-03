import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router";
import { motion } from "motion/react";
import { Suspense, lazy, useEffect } from "react";
import { PageLoader } from "@/components/Loader";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Genres = lazy(() => import("./pages/Genres"));
const Movies = lazy(() => import("./pages/Movies"));
const Player = lazy(() => import("./components/Player"));
const TvShows = lazy(() => import("./pages/TvShows"));
const Details = lazy(() => import("./pages/Details"));
const Person = lazy(() => import("./pages/Person"));
const Error = lazy(() => import("./pages/Error"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

import "./App.css";

const AnimatedOutlet = () => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex min-h-screen flex-col"
    >
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </motion.div>
  );
};

const Root = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <AnimatedOutlet />;
};

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Search /> },
      { path: "/search/:searchTerm", element: <Search /> },
      { path: "/genres", element: <Genres /> },
      { path: "/movies/:genre", element: <Movies /> },
      { path: "/movies", element: <Movies /> },
      { path: "/movie-info/:movieId", element: <Details /> },
      { path: "/tv-info/:movieId", element: <Details /> },
      { path: "/person/:personId", element: <Person /> },
      { path: "/player/:playerId", element: <Player /> },
      { path: "/tv-series", element: <TvShows /> },
      { path: "/about", element: <About /> },
      { path: "/privacy-policy", element: <Privacy /> },
      { path: "/terms", element: <Terms /> },
      { path: "*", element: <Error /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
