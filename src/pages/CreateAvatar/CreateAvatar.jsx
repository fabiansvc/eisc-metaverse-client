import "./create-avatar.css"
import Logout from "../Components/Logout/Logout";
import { AvatarCreatorViewer } from "@readyplayerme/rpm-react-sdk";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CreateAvatar = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [url, setUrl] = useState("");

    const handleOnUserSet = (userId) => {
        setUserId(userId);
    };

    const handleOnAvatarExported = (url) => {
        setUrl(url);
    };

    useEffect(() => {
        if (url != "" && userId != null)
            navigate("/metaverse", { state: { url: url, userId: userId } });
    }, [url, userId]);

    const configPropertiesAvatar = {
        clearCache: true,
        bodyType: 'fullbody',
        quickStart: true,
        language: 'es',
    };

    return <>
        <Logout />
        <div className="container-avatar-creator-viewer">
            <AvatarCreatorViewer
                subdomain="eisc-metaverse"
                editorConfig={configPropertiesAvatar}
                onUserSet={handleOnUserSet}
                onAvatarExported={handleOnAvatarExported} />
        </div>
    </>

};

export default CreateAvatar;
