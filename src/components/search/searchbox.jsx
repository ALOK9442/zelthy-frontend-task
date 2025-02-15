import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { handleAlert } from "../../utils/handlealert";

const SearchBox = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!validateEmail(searchEmail)) {
      setIsValidEmail(false);
      handleAlert("Invalid email address", "error");
      return;
    }
    setIsValidEmail(true);
    console.log(
      "emailyNavigating to:",
      `/schedule/${encodeURIComponent(searchEmail)}`
    );
    navigate(`/schedule/${encodeURIComponent(searchEmail)}`);
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      className="max-w-2xl mx-auto"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search colleagues by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className={`w-full px-6 py-4 rounded-xl shadow-lg text-lg
            ${!isValidEmail ? "border-2 border-red-500" : "border-none"}
            focus:outline-none focus:ring-4 focus:ring-blue-200`}
        />
        <button
          type="submit"
          className="absolute right-4 top-4 text-blue-600 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faSearch} className="text-2xl" />
        </button>
      </div>
    </motion.form>
  );
};

export default SearchBox;
