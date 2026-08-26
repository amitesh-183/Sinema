import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Clapperboard,
  Film,
  Home,
  Menu,
  Moon,
  Search,
  Sun,
  Tv,
  X,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/api.service";
import { useGenre } from "@/store/useGenre";
import { useTheme } from "@/store/useThemeStore";
import { cn } from "@/lib/utils";

interface Genre {
  id: number;
  name: string;
}

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  { to: "/movies", label: "Movies", icon: Film, match: (p: string) => p.includes("/movies") || p.includes("/movie-info") },
  { to: "/tv-series", label: "TV Shows", icon: Tv, match: (p: string) => p.includes("/tv") },
];

const GenreMenu = ({ onNavigate }: { onNavigate?: () => void }) => {
  const navigate = useNavigate();
  const setGenres = useGenre((state) => state.setGenreId);
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["/genre/movie/list?language=en"],
    queryFn: () => fetchMovies("/genre/movie/list?language=en"),
    staleTime: 5 * 60 * 1000,
  });

  const movies = data?.data?.genres;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10">
        Genres
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="glass absolute left-0 top-full z-50 mt-2 w-52 rounded-2xl border border-white/10 p-2"
          >
            <div className="max-h-[300px] overflow-y-auto pr-1">
              {movies?.map((genre: Genre) => (
                <button
                  key={genre.id}
                  onClick={() => {
                    setGenres(genre.id);
                    navigate(`/movies/${genre.name}`);
                    onNavigate?.();
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ThemeMenu = () => {
  const theme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.setTheme);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    if (theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle theme"
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
      >
        <Sun className="absolute h-4 w-4 rotate-0 scale-100 text-amber-300 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="glass absolute right-0 top-full z-50 mt-2 w-36 rounded-2xl border border-white/10 p-1.5"
          >
            {(["light", "dark", "system"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full rounded-xl px-3 py-2 text-left text-sm capitalize transition-colors",
                  theme === t
                    ? "bg-brand-gradient font-semibold text-white"
                    : "text-muted-foreground hover:bg-white/10"
                )}
              >
                {t}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = ({ extraClasses = "" }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "glass sticky top-0 z-50 flex w-full items-center justify-between border-b border-white/10 px-3 py-2.5 sm:px-4 md:px-10",
          extraClasses
        )}
      >
        <Link to="/" className="group flex items-center gap-1.5 sm:gap-2">
          <div className="animate-pulse-ring rounded-lg bg-brand-gradient p-1 sm:rounded-xl sm:p-1.5 transition-transform group-hover:rotate-6">
            <Clapperboard className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <span className="font-display hidden text-lg font-bold tracking-tight sm:block sm:text-xl">
            Sine<span className="text-gradient">ma</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ to, label, icon: Icon, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-brand-gradient"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
          <GenreMenu />
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => navigate("/search")}
            aria-label="Search"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10 sm:h-9 sm:w-9"
          >
            <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          <ThemeMenu />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10 md:hidden sm:h-9 sm:w-9"
          >
            {mobileOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="glass fixed inset-x-2 top-14 z-40 rounded-2xl border border-white/10 p-3 sm:inset-x-3 sm:top-16 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label, icon: Icon, match }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    match(pathname)
                      ? "bg-brand-gradient text-white"
                      : "text-muted-foreground hover:bg-white/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              <div className="mt-1 border-t border-white/10 pt-2">
                <GenreMenu onNavigate={() => setMobileOpen(false)} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
