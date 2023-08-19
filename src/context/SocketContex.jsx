import { createContext, useContext, useMemo, useState } from "react";
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
    const socket = useMemo(() => {
        return io("http://localhost:5000");
    }, []);

    const [avatarsConnected, setAvatarsConnected] = useState(null);

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
