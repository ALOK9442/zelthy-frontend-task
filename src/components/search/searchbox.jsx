import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";

export default function SearchBox({
  searchQuery,
  setSearchQuery,
  className,
  placeholder,
}) {
  return (
    <div className="sm:flex hidden items-center justify-center border-2 border-gray-300 rounded-lg px-2 py-0.5">
      <Tooltip title="Search for users by email to check their availability." arrow>
        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`pl-2 border-0 focus:outline-none ${className}`}
        />
      </Tooltip>
    </div>
  );
}
