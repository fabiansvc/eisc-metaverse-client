import { createContext, useContext, useState } from "react";

export const avatarContext = createContext();

export const useAvatar = () => {
    const context = useContext(avatarContext)
    if (!context) {
        console.log("Error creating avatar context");
    }
    return context;
};

export function AvatarProvider({ children }) {
    const [avatar, setAvatar] = useState({
        userId: "",
        url: "",
        position: [0, 0, 0],
        rotation: [0, - Math.PI, 0],
        scale: [1, 1, 1],
        animation: "Idle",
        body: null,
    });

    return (
        <avatarContext.Provider value={{avatar, setAvatar}}>
            {children}
        </avatarContext.Provider>
    );
}
