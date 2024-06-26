/**
 * Component for creating an avatar.
 * This component provides functionality to create an avatar using the Ready Player Me SDK.
 * Users can customize their avatars and save them to their profiles.
 */
import "./styles-create-avatar.css";
import { AvatarCreatorViewer } from "@readyplayerme/rpm-react-sdk";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editUser, getUser } from "../../db/user-collection";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";

/**
 * Functional component for creating an avatar.
 * @returns {JSX.Element} The avatar creation interface.
 */
const CreateAvatar = () => {
  const auth = useAuth();
  const { setUser } = useUser();
  const { email } = auth.userLogged;
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state;
  const readyPlayerMeSubdomain =
    process.env.REACT_APP_READY_PLAYER_ME_SUBDOMAIN;

  /**
   * Handles the event when the avatar is exported.
   * @param {string} url The URL of the exported avatar.
   */
  const handleOnAvatarExported = (url) => {
    setAvatarUrl(url);
  };

  /**
   * Saves the avatar URL to the user's profile.
   */
  const saveAvatarUser = async () => {
    const user = await getUser(email);
    if (user.success) {
      const newData = {
        ...user.data[0],
        avatarUrl: avatarUrl,
        avatarPng: avatarUrl.replace(".glb", ".png"),
      };

      const result = await editUser(email, newData);
      if (result.success) {
        setUser({
          ...user.data[0],
          avatarUrl: avatarUrl,
          avatarPng: avatarUrl.replace(".glb", ".png"),
        });
        navigate("/metaverse", { state: "user" });
      } else {
        alert("Error creating avatar, please try again.");
      }
    }
  };

  /**
   * Sets the guest avatar URL in local storage.
   */
  const setAvatarGuest = () => {
    window.localStorage.setItem("avatarUrl", avatarUrl);
    window.localStorage.setItem("avatarPng", avatarUrl.replace(".glb", ".png"));
    navigate("/metaverse", { state: "guest" });
  };

  useEffect(() => {
    if (type === "user" && avatarUrl !== "") {
      saveAvatarUser();
    } else if (type === "guest" && avatarUrl !== "") {
      setAvatarGuest();
    }
  }, [type, avatarUrl]);

  const configPropertiesAvatar = {
    clearCache: true,
    bodyType: "fullbody",
    quickStart: false,
    language: "es",
    textureFormat: "webp",
  };

  return (
    <div className="container-avatar-creator-viewer">
      <AvatarCreatorViewer
        subdomain={readyPlayerMeSubdomain}
        editorConfig={configPropertiesAvatar}
        onAvatarExported={handleOnAvatarExported}
      />
    </div>
  );
};

export default CreateAvatar;
