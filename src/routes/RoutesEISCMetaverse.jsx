/**
 * React Router DOM and authentication-aware routing component for EISC Metaverse.
 * This component handles routing for different pages in the application while ensuring authentication.
 * If the user is not logged in, it redirects to the login page.
 */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import CreateAvatar from "../pages/CreateAvatar/CreateAvatar";
import Metaverse from "../pages/Metaverse/Metaverse";
import { useAuth } from "../context/AuthContext";

const RoutesEISCMetaverse = () => {
  /**
   * Authentication guard component to ensure that routes are accessible only to logged-in users.
   * @param {Object} children The child elements of the route.
   * @returns {JSX.Element} The child elements if the user is logged in, otherwise redirects to the login page.
   */
  const AuthGuard = ({ children }) => {
    const { userLogged } = useAuth();

    if (!userLogged) {
      return <Navigate to="/" />;
    }
    return children;
  };

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
};

export default RoutesEISCMetaverse;
