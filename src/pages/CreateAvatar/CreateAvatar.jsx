import { AvatarCreatorViewer } from "@readyplayerme/rpm-react-sdk";
import { useNavigate } from "react-router-dom";
import "./stylesCreateAvatar.css"
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
    }

    useEffect(() => {
        if (url != "" && userId != null)
            navigate("/metaverse", { state: { url: url, userId: userId } });
    }, [url, userId])

    const config = {
        clearCache: true,
        bodyType: 'fullbody',
        quickStart: true,
        language: 'es',
    };

    return (
        <div className="avatarCreatorViewer">
            <AvatarCreatorViewer
                subdomain="eisc-metaverse"
                editorConfig={config}
                onUserSet={handleOnUserSet}
                onAvatarExported={handleOnAvatarExported} />
        </div>
    );
};

export default CreateAvatar;
