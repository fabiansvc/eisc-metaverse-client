import "./profile.css";
import EditAvatar from "./components/EditAvatar/EditAvatar";
import EditDataUser from "./components/EditUser/EditDataUser";

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
        <>
          <EditDataUser />
          {/* Visual separator between user data editing section and avatar editing section */}
          <div className="vertical-separator" />
        </>
        <EditAvatar />
      </div>
    </div>
  );
};

export default Profile;
