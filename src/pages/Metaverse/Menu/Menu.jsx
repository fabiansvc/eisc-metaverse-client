import { useState } from "react";
import { useUser } from "../../../context/userContext";
import "./menu.css";
import Profile from "../Profile/Profile";

const Menu = () => {
  const { user } = useUser();
  const [showProfile, setShowProfile] = useState(false);
  const modelSrcGLB = user.avatarUrl;
  const modelSrcPNG = modelSrcGLB.replace(".glb", ".png");
  return (
    <>
      <div className="container-user">
        <button
          className="button-user"
          role="button"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img className="icon-user" src={modelSrcPNG} alt="user" />
        </button>
      </div>
      {showProfile && <Profile />}
    </>
  );
};

export default Menu;
