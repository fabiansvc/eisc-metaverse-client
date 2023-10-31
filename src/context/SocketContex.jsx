import { createContext, useContext, useEffect, useState } from "react";
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
  // const socket = io("https://eisc-metaverse-server.onrender.com");
  const socket = io("http://localhost:5000")

  const [avatarsConnected, setAvatarsConnected] = useState();

  const connectAvatar = async (avatar) => {
    await socket.emit("connect-avatar", avatar);
  };

  const disconnectAvatar = async (nickname) => {
    await socket.emit("disconnect-avatar", nickname);
  };

  socket.on("avatars-connected", (avatars) => {
    setAvatarsConnected(avatars);
  });

  return (
    <socketContext.Provider value={{ connectAvatar, disconnectAvatar, avatarsConnected }}>
      {children}
    </socketContext.Provider>
  );
}
