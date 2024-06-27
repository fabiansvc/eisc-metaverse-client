import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useMemo } from "react";
import NotFound from "../pages/NotFound/NotFound";
import CreateAvatar from "../pages/CreateAvatar/CreateAvatar";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Metaverse from "../pages/Metaverse/Metaverse";

/**
 * Authentication guard component to ensure that routes are accessible only to logged-in users.
 * @param {Object} props The component props.
 * @param {JSX.Element} props.children The child elements of the route.
 * @returns {JSX.Element} The child elements if the user is logged in, otherwise redirects to the login page.
 */
const AuthGuard = ({ children }) => {
  const { userLogged } = useAuth();

  if (!userLogged) {
    return <Navigate to="/" />;
  }
  return children;
};

export default function RoutesEISCMetaverse() {
  const authGuard = useMemo(() => <AuthGuard />, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login />} />

        {/* Route for registering a new user */}
        <Route
          path="/register-user"
          element={
            <AuthGuard>
              <Register />
            </AuthGuard>
          }
        />

        {/* Route for creating an avatar */}
        <Route
          path="/create-avatar"
          element={
            <AuthGuard>
              <CreateAvatar />
            </AuthGuard>
          }
        />

        {/* Route for accessing the metaverse */}
        <Route
          path="/metaverse"
          element={
            <AuthGuard>
              <Metaverse />
            </AuthGuard>
          }
        />

        {/* Route for handling unknown URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
