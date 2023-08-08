import "./profile.css";
import EditAvatar from "./EditAvatar/EditAvatar";
import EditDataUser from "./EditUser/EditDataUser";

const Profile = () => {
    return (
        <div className="container-profile">
            <div className="card-profile">
                <EditDataUser />
                <EditAvatar />
            </div>
        </div>
    )
};

export default Profile;