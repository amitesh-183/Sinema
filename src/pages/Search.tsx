import { MdManageSearch } from "react-icons/md";
// import Header from "@/components/Header";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { useSearch } from "@/store/useSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Search = () => {
  // const { searchQuery, setSearchQuery } = useSearch();

  const searchQuery = useSearch((state) => state.searchQuery);
  const setSearchQuery = useSearch((state) => state.setSearchQuery);

  const debounceQuery = useDebounce(searchQuery, 500);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <>
      <Header />
      <div className="flex flex-col mt-4 gap-2 justify-center items-center">
        <Link to="/" className="flex gap-4 items-center border py-2 px-4 pl-1.5 rounded-full absolute top-20 left-10"><ChevronLeft size={"20"} />Back</Link>
        <h2 className="text-4xl font-bold">Blink Search</h2>
        <div className="searchBox">
          <input
            className="searchInput"
            type="text"
            name=""
            value={searchQuery || ""}
            onChange={handleSearchInputChange}
            placeholder="Search something"
          />
          <button
            title="search"
            className="searchButton"
          // onClick={handleSearch}
          >
            <BiSearch className="w-7 h-7 translate-x-1" />
          </button>
        </div>
      </div>
      {/* <h4 className="px-10 font-semibold text-2xl">
        Search Results for : {searchQuery}
      </h4> */}
      {debounceQuery ? (
        <Main
          sectionTitle={`Search Results for ${debounceQuery}`}
          url="/search/multi"
          searchQuery={debounceQuery}
        />
      ) : (
        <>
          <div className="flex items-center flex-col justify-center min-h-[60vh]">
            <MdManageSearch size={120} className="text-zinc-500/40" />
            <h2 className="text-2xl font-bold">
              Search Some Amazing movies/series
            </h2>
          </div>
        </>
      )}
    </>
  );
};

export default Search;
