import { useState } from "react";
import { useUser } from "../../../context/userContext";
import "./menu.css";
import Profile from "../Profile/Profile";

const Menu = () => {
  const { user } = useUser();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div className="container-menu">
        <button
          className="button-avatar"
          role="button"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img className="icon-avatar" src={user.avatarPng} alt="user" />
        </button>
      </div>
      {showProfile && <Profile />}
    </>
  );
};

export default Menu;
