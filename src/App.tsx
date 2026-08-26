import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router";
import { motion } from "motion/react";
import { useEffect } from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Genres from "./pages/Genres";
import Community from "./pages/Community";
import Upload from "./pages/Upload";
import Analytics from "./pages/Analytics";
import Movies from "./pages/Movies";
import Player from "./components/Player";
import TvShows from "./pages/TvShows";
import Details from "./pages/Details";
import Person from "./pages/Person";
import Error from "./pages/Error";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

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
      <Outlet />
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
      { path: "/upload", element: <Upload /> },
      { path: "/community", element: <Community /> },
      { path: "/analytics", element: <Analytics /> },
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
