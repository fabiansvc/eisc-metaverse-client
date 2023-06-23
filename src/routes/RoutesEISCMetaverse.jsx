import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login/Login";
import UserRegister from "../pages/Register/UserRegister";
import UserProfile from "../pages/Profile/UserProfile";
import NotFound from "../pages/NotFound/NotFound";
import CreateAvatar from "../pages/Avatar/CreateAvatar";

const RoutesEISCMetaverse = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/create-avatar" element={<CreateAvatar />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default RoutesEISCMetaverse;