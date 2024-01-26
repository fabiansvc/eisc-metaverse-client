import "./create-avatar.css";
import { AvatarCreatorViewer } from "@readyplayerme/rpm-react-sdk";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editUser, getUser } from "../../db/user-collection";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useAvatar } from "../../context/AvatarContext";

const CreateAvatar = () => {
  const auth = useAuth();
  const { setUser } = useUser();
  const { setAvatar } = useAvatar();
  const { email } = auth.userLogged;
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state;
  const readyPlayerMeSubdomain = process.env.REACT_APP_READY_PLAYER_ME_SUBDOMAIN;

  const handleOnAvatarExported = (url) => {
    setAvatarUrl(url);
  };

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
        alert("Error al crear el avatar, intentalo de nuevo.");
      }
    }
  };

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

  useEffect(() => {
    setUser(null);
    setAvatar({
      ref: null,
      body: null,
      animation: "Idle",
    })
  }, []);

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
