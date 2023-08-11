import "./profile.css";
import EditAvatar from "./EditAvatar/EditAvatar";
import EditDataUser from "./EditUser/EditDataUser";
import { useUser } from "../../../context/userContext";

const Profile = () => {
  const { user } = useUser();
  const type = user.type;

  return (
    <div className="container-profile">
      <div className="card-profile">
        {
          <>
            {type !== "guest" && <EditDataUser />}
            <div className="vertical-separator" />
          </>
        }
        <EditAvatar />
      </div>
    </div>
  );
};

export default Profile;
