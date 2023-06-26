import { useLocation } from "react-router-dom";
import Logout from "../Logout/Logout";
import { Avatar } from "@readyplayerme/rpm-react-sdk/node_modules/@readyplayerme/visage";
import "./stylesProfile.css";

const Profile = () => {
    const location = useLocation();
    const { avatarUrl } = location.state;

    return <>
        <Logout />
        <div className="avatarVisage">
            <Avatar modelSrc={avatarUrl} />
        </div>
    </>

};
export default Profile;
