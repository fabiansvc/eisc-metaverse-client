import Logout from "../../Components/Logout/Logout";
import "./profile.css";
import { Avatar } from "@readyplayerme/rpm-react-sdk/node_modules/@readyplayerme/visage";

const Profile = () => {
    return <>
        <Logout />
        <div className="container-profile">
            {/* <Avatar modelSrc={avatarUrl} /> */}
        </div>
    </>

};
export default Profile;