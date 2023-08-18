import { createContext, useContext, useMemo } from "react";

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
        const io = require("socket.io-client");
        return io("http://localhost:5000");
    }, []);
  
    const sendAvatarMessage = (avatar) => {
        // Connect to the socket
        socket.on("connect", () => {
            console.log("Connected to the Socket.io server");

            // Send an avatar to the server when the connection is established
            socket.emit("client-send-avatar", avatar);
        });

        socket.on("avatars", (avatars) => {
            console.log("Avatars received from the server:", avatars);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from the Socket.io server");
        });

    };

    return (
        <socketContext.Provider value={{ sendAvatarMessage }}>
            {children}
        </socketContext.Provider>
    );
}
