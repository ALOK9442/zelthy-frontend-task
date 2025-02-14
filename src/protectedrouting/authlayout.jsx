import { Box, CircularProgress } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log("User is logged in:", user);
            navigate("/dashboard");
          } else {
            navigate("/login");
          }
          setLoader(false);
        });
    
        return () => unsubscribe();
  }, [navigate, authentication]);

  return loader ? (
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
  ) : (
    <>{children}</>
  );
}
