import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import CreateAvatar from "../pages/CreateAvatar/CreateAvatar";

const RoutesEISCMetaverse = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/user-register" element={<Register />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/create-avatar" element={<CreateAvatar />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default RoutesEISCMetaverse;