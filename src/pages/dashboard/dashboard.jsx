import { onAuthStateChanged } from "firebase/auth";
import CalendarComponent from "../../components/calendar/calendar";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { Box, CircularProgress } from "@mui/material";
import Logo from "../../utils/logo";
import SearchBox from "../../components/search/searchbox";
import HeaderProfile from "../../components/headerprofile/headerprofile";
import { handleLogout } from "../../firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import {  faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sidebarVariants = {
  open: { x: 0, opacity: 1 },
  closed: { x: "-100%", opacity: 0 },
};

export default function Dashboard() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setEmail(user.email);
        setName(user.displayName);
        setImgLink(user.photoURL);
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (!userId) {
    return (
      <div className="text-center text-lg text-red-500">
        Please log in first.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-full bg-white shadow-lg"
      >
        <FontAwesomeIcon
          icon={isMobileMenuOpen ? faTimes : faBars}
          className="text-xl"
        />
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
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
        )}
      </AnimatePresence>

      <div className=" transition-all">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="hidden md:block">
              <Logo className="text-2xl text-blue-600" />
            </div>

            <HeaderProfile
              name={name}
              email={email}
              imgLink={imgLink}
              onLogout={handleLogout}
            />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Schedule Manager
            </h1>
            <div className="max-w-2xl">
              <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search team members by email..."
                className="w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CalendarComponent
              userId={userId}
              currentUserId={userId}
              readOnly={false}
            />
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
}
