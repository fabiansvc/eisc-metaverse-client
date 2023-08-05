import "./profile.css";
import { useUser } from "../../../../context/userContext";
import { Avatar } from "@readyplayerme/rpm-react-sdk/node_modules/@readyplayerme/visage";

const Profile = () => {
    const { user } = useUser();

    const avatarUrl = user.avatarUrl;
    const animationUrl = user.gender === "male"? 'https://readyplayerme.github.io/visage/male-idle.glb': 'https://readyplayerme.github.io/visage/female-idle.glb';
    return (
        <div className="container-profile">
            <Avatar 
                className="avatar-view" 
                modelSrc={avatarUrl} 
                animationSrc={animationUrl}
                cameraInitialDistance={2.5}
                ambientLightColor="#fff5b6"
                ambientLightIntensity={0.25}
                cameraTarget={1.65}
                dirLightColor="#002aff"
                dirLightIntensity={5}
                environment="hub"
                scale={1}
                spotLightAngle={0.314}
                spotLightColor="#fff5b6"
                spotLightIntensity={1}
            />
        </div>
    )
};

export default Profile;