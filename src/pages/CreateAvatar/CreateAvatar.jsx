import "./create-avatar.css";
import { AvatarCreatorViewer } from "@readyplayerme/rpm-react-sdk";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editUser, getUser } from "../../db/UsersCollection";
import { useAuth } from "../../context/authContext";

const CreateAvatar = () => {
  const auth = useAuth();
  const { email } = auth.userLogged;
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state;

  const handleOnAvatarExported = (url) => {
    setAvatarUrl(url);
  };

  const saveAvatarUser = async () => {
    const user = await getUser(email);
    if (user.success) {
      const newData = {
        ...user.data[0],
        avatarUrl: avatarUrl,
      };
      const result = await editUser(email, newData);
      result.success
        ? navigate("/metaverse", { state: "user" })
        : alert("Error al crear el avatar, intentalo de nuevo.");
    }
  };

  const setAvatarGuest = () => {
    window.localStorage.setItem("avatarUrl", avatarUrl);
    navigate("/metaverse", { state: "guest" });
  };

  useEffect(() => {
    if(type === "user" && avatarUrl !== "") {
      saveAvatarUser()
    }else if(type === "guest" && avatarUrl !== "") {
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
    <>
      <div className="container-avatar-creator-viewer">
        <AvatarCreatorViewer
          subdomain="eisc-metaverse"
          editorConfig={configPropertiesAvatar}
          onAvatarExported={handleOnAvatarExported}
        />
      </div>
    </>
  );
};

export default CreateAvatar;
