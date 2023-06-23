import { useLocation } from "react-router-dom";
import Logout from "../Logout/Logout";
import { Avatar } from "@readyplayerme/visage";
import "./userProfile.css";
const UserProfile = () => {
    const location = useLocation();
    const { avatarUrl } = location.state;

    return <>
        <Logout />
        <div className="avatarVisage">
            <Avatar modelSrc={avatarUrl} />
        </div>
    </>

};
export default UserProfile;
