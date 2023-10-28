import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

export const socketContext = createContext();

export const useSocket = () => {
    const context = useContext(socketContext);
    if (!context) {
        console.error("Error creating socket context");
    }
    return context;
};

export function SocketProvider({ children }) {
    const socket = io("https://eisc-metaverse-server.onrender.com");

    const [avatarsConnected, setAvatarsConnected] = useState();
    
    const sendAvatarMessage = async (avatar) => {
        await socket.emit("client-send-avatar", avatar);
    };


    socket.on("server-send-avatars", (avatars) => {
        setAvatarsConnected(avatars);
    });

    return (
        <socketContext.Provider value={{ sendAvatarMessage, avatarsConnected }}>
            {children}
        </socketContext.Provider>
    );
}
