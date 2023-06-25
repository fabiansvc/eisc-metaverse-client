import { useLocation } from "react-router-dom";
import Logout from "../Logout/Logout";
import { Avatar } from "@readyplayerme/rpm-react-sdk/node_modules/@readyplayerme/visage";
import "./userProfile.css";
const UserProfile = () => {
    const location = useLocation();
    const { avatarUrl } = location.state;
    console.log(avatarUrl);
    return <>
        <Logout />
        <div className="avatarVisage">
            <Avatar modelSrc={avatarUrl} />
        </div>
    </>

};
export default UserProfile;
