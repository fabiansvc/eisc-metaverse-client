import EditAvatar from "./EditAvatar/EditAvatar";
import EditDataUser from "./EditUser/EditDataUser";
import { useUser } from "../../../context/UserContext";
import "./profile.css";

const Profile = () => {
  const { user } = useUser();
  const { type } = user;

  return (
    <div className="container-profile">
      <div className="card-profile">
        {type !== "guest" && (
          <>
            <EditDataUser />
            <div className="vertical-separator" />
          </>
        )}
        <EditAvatar />
      </div>
    </div>
  );
};

export default Profile;
