import "./profile.css";
import EditAvatar from "./EditAvatar/EditAvatar";
import EditUser from "./EditUser/EditUser";

const Profile = () => {
    return (
        <div className="container-profile">
            <div className="card-profile">
                <EditUser />
                <EditAvatar />
            </div>

        </div>
    )
};

export default Profile;