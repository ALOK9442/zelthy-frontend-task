import Logo from "../../utils/logo";
import SearchBox from "../search/searchbox";
import { motion } from "framer-motion";

export default function Sidebar({
    sidebarVariants,
    searchQuery,
    setSearchQuery,
}) {
  return (
    <motion.nav
      variants={sidebarVariants}
      initial="closed"
      animate="open"
      exit="closed"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-40 p-4"
    >
      <div className="mb-8">
        <Logo className="text-2xl" />
      </div>
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        className="w-full z-0 mb-6"
      />
      <nav className="space-y-2">
        <button className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors">
          My Schedule
        </button>
        <button className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors">
          Team View
        </button>
        <button className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors">
          Settings
        </button>
      </nav>
    </motion.nav>
  );
}
