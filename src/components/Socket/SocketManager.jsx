import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const socket = io(process.env.REACT_APP_SERVER_WEB_SOCKETS_URL)
export const avatarsAtom = atom([]);

export const SocketManager = () => {
    const [_avatars, setAvatars] = useAtom(avatarsAtom);
    
    useEffect(() => {
        const onConnect = () => {
            // console.log("connected");
        }
        const onDisconnect = () => {
            // console.log("disconnect");
        }

        const onAvatars = (avatars) => {
            setAvatars(avatars);
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("avatars", onAvatars);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("avatars", onAvatars);
        }
    }, [])
}