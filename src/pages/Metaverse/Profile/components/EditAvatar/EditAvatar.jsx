import "./edit-avatar.css";
import React from "react";
import { useUser } from "../../../../../context/UserContext";
import { Avatar } from "@readyplayerme/rpm-react-sdk/node_modules/@readyplayerme/visage";
import { useNavigate } from "react-router-dom";
import { socketServer } from "../../../../../socket/socket-server";

/**
 * Component for editing the avatar.
 * @returns {JSX.Element} The JSX.Element for editing the avatar.
 */
const EditAvatar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const avatarUrl = user.avatarUrl;
  const animationUrl =
    user.gender === "male"
      ? "https://readyplayerme.github.io/visage/male-idle.glb"
      : "https://readyplayerme.github.io/visage/female-idle.glb";

  /**
   * Handles the edit avatar action.
   * Emits an "avatar-updated" event to the socket server and navigates to the create-avatar page.
   */
  const editAvatar = () => {
    socketServer.broadcast.emit("avatar-updated");
    navigate("/create-avatar", { state: user.type });
  };

  return (
    <div className="container-edit-avatar">
      <Avatar
        className="avatar-view"
        modelSrc={avatarUrl}
        animationSrc={animationUrl}
        cameraInitialDistance={2.5}
        ambientLightColor="#fff5b6"
        ambientLightIntensity={1}
        cameraTarget={1.5}
        dirLightColor="#002aff"
        dirLightIntensity={5}
        environment="hub"
        scale={1}
        spotLightAngle={0.314}
        spotLightColor="#fff5b6"
        spotLightIntensity={0.5}
      />
      <button
        type="button"
        role="button"
        className="button-edit"
        onClick={() => editAvatar()}
      >
        Editar avatar
      </button>
    </div>
  );
};

export default EditAvatar;
