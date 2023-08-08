import "./create-avatar.css";
import Logout from "../Components/Logout/Logout";
import { AvatarCreatorViewer } from "@readyplayerme/rpm-react-sdk";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editUser, getUser } from "../../db/UsersCollection";
import { useAuth } from "../../context/authContext";

const CreateAvatar = () => {
  const auth = useAuth();
  const { email } = auth.userLogged;
  const [userId, setUserId] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state;

  const handleOnUserSet = (userId) => {
    setUserId(userId);
  };

  const handleOnAvatarExported = (url) => {
    setUrl(url);
  };

  const saveAvatarUser = async (url, userId, email) => {
    const user = await getUser(email);
    if (user.success) {
      const newData = {
        ...user.data[0],
        avatar_url: url,
        avatar_id: userId,
      };
      const result = await editUser(email, newData);
      result.success
        ? navigate("/metaverse", { state: "user" })
        : alert("Error al crear el avatar, intentalo de nuevo.");
    }
  };

  const setAvatarGuest = (url, userId) => {
    window.localStorage.setItem("avatar_url", url);
    window.localStorage.setItem("avatar_id", userId);
    navigate("/metaverse", { state: "guest" });
  };

  useEffect(() => {
    if (type && url != "" && userId != "")
      type === "user"
        ? saveAvatarUser(url, userId, email)
        : setAvatarGuest(url, userId);
  }, [type, url, userId, email]);

  const configPropertiesAvatar = {
    clearCache: true,
    bodyType: "fullbody",
    quickStart: false,
    language: "es",
    textureFormat: "webp",
  };

  return (
    <>
      <div className="container-avatar-creator-viewer">
        <AvatarCreatorViewer
          subdomain="eisc-metaverse"
          editorConfig={configPropertiesAvatar}
          onUserSet={handleOnUserSet}
          onAvatarExported={handleOnAvatarExported}
        />
      </div>
    </>
  );
};

export default CreateAvatar;
