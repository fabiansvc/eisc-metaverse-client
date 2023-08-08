import "./edit-avatar.css";
import { useUser } from "../../../../context/userContext";
import { Avatar } from "@readyplayerme/rpm-react-sdk/node_modules/@readyplayerme/visage";

const EditAvatar = () => {
  const { user } = useUser();
  const avatarUrl = user.avatarUrl;
  const animationUrl =
    user.gender === "male"
      ? "https://readyplayerme.github.io/visage/male-idle.glb"
      : "https://readyplayerme.github.io/visage/female-idle.glb";

  return (
    <div className="container-edit-avatar">
      <Avatar
        className="avatar-view"
        modelSrc={avatarUrl}
        animationSrc={animationUrl}
        cameraInitialDistance={2.5}
        ambientLightColor="#fff5b6"
        ambientLightIntensity={0.5}
        cameraTarget={1.5}
        dirLightColor="#002aff"
        dirLightIntensity={5}
        environment="hub"
        scale={1}
        spotLightAngle={0.314}
        spotLightColor="#fff5b6"
        spotLightIntensity={0.5}
      />
    </div>
  );
};

export default EditAvatar;
