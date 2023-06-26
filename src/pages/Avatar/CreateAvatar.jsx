import { AvatarCreatorViewer } from "@readyplayerme/rpm-react-sdk";
import { useNavigate } from "react-router-dom";
import "./stylesCreateAvatar.css"

const CreateAvatar = () => {
    const navigate = useNavigate();
    const handleOnAvatarExported = (url) => {
        navigate("/user-profile", { state: { avatarUrl: url } });
    }

    return (
        <div className="avatarCreatorViewer">
            <AvatarCreatorViewer
                subdomain="eisc-metaverse"
                onAvatarExported={handleOnAvatarExported} />
        </div>
    );
};

export default CreateAvatar;
