import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login.jsx";
import Landing from "./pages/landing/landing.jsx";
import SignupPage from "./pages/auth/signup.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import AuthLayout from "./protectedrouting/authlayout.jsx";
import UserSchedulePage from "./pages/userschedule/userschedule.jsx";
import ProfilePage from "./pages/profile/userprofile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication={true}>
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/schedule/:email",
        element: (
          <AuthLayout authentication={true}>
            <UserSchedulePage />
          </AuthLayout>
        ),
        // element: <h1>hello</h1>,
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication={true}>
            <ProfilePage />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
