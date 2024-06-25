import "./styles-profile.css";
import EditAvatar from "./components/edit-avatar/EditAvatar";
import EditDataUser from "./components/edit-user/EditDataUser";

/**
 * Profile Component
 * @component
 * @description Renders the user's profile information and provides options to edit the avatar and user data.
 * @returns {JSX.Element} Profile component
 */
const Profile = () => {
  return (
    <div className="container-profile">
      <div className="card-profile">
        <EditAvatar />
        <div className="vertical-separator" />
        <EditDataUser />
      </div>
    </div>
  );
};

export default Profile;
