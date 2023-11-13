import "./profile.css";
import EditAvatar from "./components/EditAvatar/EditAvatar";
import EditDataUser from "./components/EditUser/EditDataUser";

const Profile = () => {
  return (
    <div className="container-profile">
      <div className="card-profile">
        <>
          <EditDataUser />
          <div className="vertical-separator" />
        </>
        <EditAvatar />
      </div>
    </div>
  );
};

export default Profile;
