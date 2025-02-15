import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const HeaderProfile = ({ imgLink, name, email, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative flex items-center gap-3 cursor-pointer"
      onClick={() => setShowMenu(!showMenu)}
    >
      <img
        src={imgLink}
        alt="Profile"
        className="w-10 h-10 rounded-full border-2 border-blue-500"
      />
      <div className="hidden md:block">
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`transition-transform duration-300 ${
          showMenu ? "rotate-180" : "rotate-0"
        }`}
      />

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute md:right-0 top-12 bg-white rounded-lg shadow-xl py-2 w-48 z-1000"
          >
            <div className="px-4 py-2 text-sm text-gray-500 border-b">
              {email}
            </div>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
              Profile
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
              Settings
            </button>
            <button
              onClick={onLogout}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HeaderProfile;
