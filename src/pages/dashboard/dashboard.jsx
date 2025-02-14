import { onAuthStateChanged } from "firebase/auth";
import CalendarComponent from "../../components/calendar/calendar";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import BigLoader from "../../utils/loader";
import { Box, CircularProgress } from "@mui/material";
import Logo from "../../utils/logo";
import SearchBox from "../../components/search/searchbox";
import HeaderProfile from "../../components/headerprofile/headerprofile";
import { handleLogout } from "../../firebase/auth";

export default function Dashboard() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imgLink, setImgLink] = useState("");

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
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="flex w-screen justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center gap-2"> 
          <Logo />
          <SearchBox
            placeholder={"John9442carter@gmail.com"}
            className={`sm:w-56 sm:text-lg text-xs truncate`}
          />
        </div>
        <HeaderProfile
          name={name}
          email={email}
          imgLink={imgLink}
          className={`w-96`}
          onLogout={handleLogout}
        />
      </header>
      {/* <CalendarComponent userId={userId} /> */}
    </div>
  );
}
