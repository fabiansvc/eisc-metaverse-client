import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import CreateAvatar from "../pages/CreateAvatar/CreateAvatar";
import Metaverse from "../pages/Metaverse/Metaverse";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

const RoutesEISCMetaverse = () => {

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
        <Route path="/" element={<Login />} />
        <Route path="/register-user" element={<AuthGuard><Register /></AuthGuard>} />
        <Route path="/create-avatar" element={<AuthGuard><CreateAvatar /></AuthGuard>} />
        <Route path="/metaverse" element={<AuthGuard><Metaverse /></AuthGuard>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesEISCMetaverse;
