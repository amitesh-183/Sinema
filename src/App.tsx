import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import React from "react";

const Home = React.lazy(() => import("@/pages/Home"));
const Search = React.lazy(() => import("@/pages/Search"));
const Genres = React.lazy(() => import("@/pages/Genres"));
const Community = React.lazy(() => import("@/pages/Community"));
const Upload = React.lazy(() => import("@/pages/Upload"));
const Analytics = React.lazy(() => import("@/pages/Analytics"));
const Movies = React.lazy(() => import("@/pages/Movies"));
const Player = React.lazy(() => import("@/components/Player"));
const TvShows = React.lazy(() => import("@/pages/TvShows"));
const Details = React.lazy(() => import("@/pages/Details"));
const Error = React.lazy(() => import("@/pages/Error"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/search/:searchTerm",
    element: <Search />,
  },
  {
    path: "/genres",
    element: <Genres />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/community",
    element: <Community />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/movies/:genre",
    element: <Movies />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/movie-info/:movieId",
    element: <Details />,
  },
  {
    path: "/tv-info/:movieId",
    element: <Details />,
  },
  {
    path: "/player/:playerId",
    element: <Player />,
  },
  {
    path: "/tv-series",
    element: <TvShows />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
