import "./create-avatar.css"
import Logout from "../Components/Logout/Logout";
import { AvatarCreatorViewer } from "@readyplayerme/rpm-react-sdk";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editUser, getUser } from "../../db/UsersCollection";
import { useAuth } from "../../context/authContext";

const CreateAvatar = () => {
    const auth = useAuth();
    const { email } = auth.userLogged
    const [userId, setUserId] = useState(null);
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    const handleOnUserSet = (userId) => {
        setUserId(userId);
    };

    const handleOnAvatarExported = (url) => {
        setUrl(url);
    };

    const saveAvatar = async (url, userId, email) => {
        const user = await getUser(email)
        if (user.success) {
            const newData = {
                ...user.data[0],
                avatar_url: url,
                avatar_id: userId,
            }
            const result = await editUser(email, newData)
            if (result.success) {
                navigate('/metaverse')
            } else {
                alert("Error al crear el avatar, intentalo de nuevo.")
            }
        }
    }

    useEffect(() => {
        if (url != "" && userId != null)
            saveAvatar(url, userId, email)
    }, [url, userId, email]);

    const configPropertiesAvatar = {
        clearCache: true,
        bodyType: 'fullbody',
        quickStart: true,
        language: 'es',
        textureFormat: 'webp'
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
