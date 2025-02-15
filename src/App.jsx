import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BigLoader from "./utils/loader";

function App() {
 
  return (
    <>
      <ToastContainer />
      <React.Suspense fallback={<BigLoader />} />
      <Outlet />
    </>
  );
}

export default App;
