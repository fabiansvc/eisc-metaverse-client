import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import CreateAvatar from "../pages/CreateAvatar/CreateAvatar";
import Metaverse from "../pages/Metaverse/Metaverse";
import { AvatarProvider } from "../context/avatarContext";

const RoutesEISCMetaverse = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/user-register" element={<Register />} />
            <Route path="/create-avatar" element={<CreateAvatar />} />
            <Route path="/metaverse" element={
                <AvatarProvider>
                    <Metaverse />
                </AvatarProvider>
            } />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default RoutesEISCMetaverse;