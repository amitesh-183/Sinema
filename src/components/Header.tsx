import { BiCategory } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  ChevronDown,
  Film,
  Home,
  Menu,
  Search,
  Moon,
  Sun,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../favicon-32x32.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { useTheme } from "@/store/useThemeStore";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/api.service";
import { useGenre } from "@/store/useGenre";

interface Genre {
  id: number;
  name: string;
}

const Header = ({ extraClasses = "" }) => {
  const theme = useTheme((state: any) => state.theme);
  const setTheme = useTheme((state: any) => state.setTheme);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [genreName, setGenreName] = useState<string | undefined>(undefined);
  // const { genres, setGenres } = useGenres();

  const genres = useGenre((state: any) => state.genres);
  const setGenres = useGenre((state: any) => state.setGenreId);

  const { data } = useQuery({
    queryKey: ["/genre/movie/list?language=en"],
    queryFn: () => fetchMovies(`/genre/movie/list?language=en`),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const movies = data?.data?.genres;

  const onGenreChange = (value: string) => {
    const genreId = Number(value);
    setGenres(genreId);
    const selectedGenre = movies?.find(
      (genre: Genre) => genre.id === genreId
    )?.name;
    setGenreName(selectedGenre);
    navigate(`/movies/${selectedGenre}`);
  };
  // console.log(genres);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.remove("dark", "light");
      root.classList.add(systemTheme);
      return;
    }
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme])
  return (
    <>
      <div
        className={`flex justify-between items-center border-b w-full bg-white/40 dark:bg-black/40 left-0 z-10 md:px-10 px-4 py-2 ${extraClasses}`}
      >
        <Link to={"/"} className="flex gap-1 items-center">
          <img src={logo} className="w-10 h-10" alt="Sinema-Movie-Icon" />
          <h3 className="font-black text-3xl tracking-wide md:block hidden">
            Sinema
          </h3>
        </Link>
        <div className="flex gap-4 items-center">
          <Search className="md:hidden" />
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img src={logo} alt="blink" className="h-10 w-10" />
                  <span className="sr-only">Blink</span>
                </Link>
                <Link
                  to="/"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname.endsWith("/")
                    ? "text-primary bg-muted"
                    : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  to="/movies"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname.includes("movie")
                    ? "text-primary bg-muted"
                    : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                >
                  <Film className="h-4 w-4" />
                  Movie
                </Link>
                <Link
                  to="/tv-series"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname.includes("tv")
                    ? "text-primary bg-muted"
                    : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                >
                  <Film className="h-4 w-4" />
                  Tv Shows
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-lg hover:bg-transparent text-muted-foreground p-0 font-semibold justify-start ps-3"
                    >
                      <BiCategory className="mr-3" />
                      Genres
                      <ChevronDown size={14} className="mt-2 ms-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-auto">
                    <DropdownMenuRadioGroup
                      value={genres?.toString()}
                      onValueChange={onGenreChange}
                      className="h-[200px] overflow-y-auto"
                    >
                      {movies?.map((genre) => (
                        <DropdownMenuRadioItem
                          key={genre.id}
                          value={genre.id.toString()}
                        >
                          <span>{genre.name}</span>
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="w-full flex gap-2">
                    <Button
                      size="icon"
                      className="justify-start ps-11 text-lg font-semibold bg-transparent text-muted-foreground"
                    >
                      <Sun className="h-[1.2rem] w-[1.2rem] absolute left-10 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] left-10 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                      Theme
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[190px]">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="md:flex hidden gap-8 items-center text-xl">
          <Link
            to={"/"}
            className={`${pathname.endsWith("/") ? "text-pink-600 font-bold" : ""
              }`}
          >
            Home
          </Link>
          <Link
            to={"/movies"}
            className={`${pathname.includes("/movies") ? "text-pink-600 font-bold" : ""
              }`}
          >
            Movie
          </Link>
          <Link
            to={"/tv-series"}
            className={`${pathname.includes("/tv") ? "text-pink-600 font-bold" : ""
              }`}
          >
            TV Series
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-xl hover:bg-transparent p-0 font-normal"
              >
                {genreName || "Genres"}
                <ChevronDown size={14} className="mt-2 ms-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuRadioGroup
                value={genres?.toString()}
                onValueChange={onGenreChange}
                className="h-[200px] overflow-y-auto"
              >
                {movies?.map((genre) => (
                  <DropdownMenuRadioItem
                    key={genre.id}
                    value={genre.id.toString()}
                  >
                    <span>{genre.name}</span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="w-0.5 mt-2 h-6" />
          <Link to={""} className="mt-2">
            <BiSearch size={24} onClick={() => navigate("/search")} />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-none" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default Header;
