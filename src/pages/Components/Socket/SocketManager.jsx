import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const socket = io("https://eisc-metaverse-server.onrender.com")
// export const socket = io("http://localhost:3001")

export const avatarsAtom = atom([]);

export const SocketManager = () => {
    const [_avatars, setAvatars] = useAtom(avatarsAtom);

    useEffect(() => {
        const onConnect = () => {
            // console.log("connected");
        }
        const onDisconnect = () =>{
            // console.log("disconnect");
        }
        const onAvatars = (value) =>  {
            setAvatars(value);
        }

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