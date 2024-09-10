import { faSearch, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = () => {
  return (
    <>
      <div className="bg-stone-200 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm">
        <FontAwesomeIcon icon={faSearch} className="mr-2" />
        <input
          type="text"
          placeholder="search"
          className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
        />
        <span className="p-1 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-1.5 top-1/2 -translate-y-1/2">
          <FontAwesomeIcon icon={faComment} />K
        </span>
      </div>
    </>
  );
};
export default Search;
