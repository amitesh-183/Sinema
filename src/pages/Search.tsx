import { lazy, Suspense, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Film, SearchX } from "lucide-react";
import { useSearch } from "@/store/useSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { PageLoader } from "@/components/Loader";

const Header = lazy(() => import("@/components/Header"));
const Main = lazy(() => import("@/components/Main"));

const Search = () => {
  const navigate = useNavigate();
  const searchQuery = useSearch((state) => state.searchQuery);
  const setSearchQuery = useSearch((state) => state.setSearchQuery);

  const debounceQuery = useDebounce(searchQuery, 500);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (debounceQuery?.trim()) {
      navigate(`/search/${encodeURIComponent(debounceQuery.trim())}`);
    }
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      <div className="mx-auto w-full max-w-3xl px-4 pt-10">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-brand-gradient px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
            <span className="mr-1">⌕</span> Blink Search
          </div>
          <h1 className="font-display text-center text-3xl font-extrabold md:text-4xl">
            Find your <span className="text-gradient">vibe</span>
          </h1>
          <div className="searchBox mt-1">
            <input
              className="searchInput"
              type="text"
              value={searchQuery || ""}
              onChange={handleSearchInputChange}
              placeholder="Search movies, TV shows, genres…"
              onKeyUp={(e) => e.key === "Enter" && handleSearch()}
            />
            <button title="search" className="searchButton" onClick={handleSearch}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {debounceQuery ? (
        <Main
          sectionTitle={`Results for "${debounceQuery}"`}
          url="/search/multi"
          searchQuery={debounceQuery}
        />
      ) : (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="animate-float-y rounded-3xl bg-brand-gradient p-6">
            <Film className="h-14 w-14 text-white" />
          </div>
          <SearchX className="h-10 w-10 text-muted-foreground" />
          <p className="max-w-sm text-muted-foreground">
            Search some amazing movies &amp; series to kick off your next
            binge.
          </p>
        </div>
      )}
    </Suspense>
  );
};

export default Search;
