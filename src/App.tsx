import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Error from "./pages/Error";

import "./App.css";

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
