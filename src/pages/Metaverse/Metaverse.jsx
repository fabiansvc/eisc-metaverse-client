import { Canvas } from "@react-three/fiber";
import Avatar from "./Avatar/Avatar";
import Controls from "./Controls/Controls";
import Lights from "./Lights/Lights";
import { KeyboardControls } from "@react-three/drei";
import useMovements from "../../utils/keys-movements";
import Instructive from "./Instructive/Instructive";
import { Suspense, useEffect, useState } from "react";
import { Perf } from "r3f-perf";
import { getUser } from "../../db/user-collection";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Menu from "./Menu/Menu";
import Users from "./Users/Users";
import EISCFirstFloor from "./EISC/EISCFirstFloor";
import EISCSecondFloor from "./EISC/EISCSecondFloor";
import { Stairs } from "./EISC/Stairs";
import Outside from "./EISC/Outside";
import { Physics } from "@react-three/rapier";
import EISCThirdFloor from "./EISC/EISCThirdFloor";
import { SocketManager, avatarsAtom, socket } from "../Components/Socket/SocketManager";
import { useAtom } from "jotai";
import Alu from "./Alu/Alu";
import Voice from "./Interaction/Voice/Voice";
import Messenger from "./Interaction/Messenger/Messenger";

const Metaverse = () => {
  const auth = useAuth();
  const { email } = auth.userLogged;
  const [isChatFocused, setIsChatFocused] = useState(false);
  const movements = useMovements(isChatFocused);
  const { user, setUser } = useUser();
  const location = useLocation();
  const type = location.state;
  const [avatars] = useAtom(avatarsAtom);

  const cameraSettings = {
    position: [0, 1.3, 1],
    fov: 60,
    near: 0.1,
    far: 200,
  };

  const glSettings = {
    antialias: true,
  };

  const setValuesGuest = (type) => {
    const nickname = window.localStorage.getItem("nickname");
    const biography = window.localStorage.getItem("biography");
    const avatarUrl = window.localStorage.getItem("avatarUrl");
    const avatarPng = window.localStorage.getItem("avatarPng");

    setUser({
      ...user,
      nickname: nickname,
      biography: biography,
      avatarUrl: avatarUrl,
      avatarPng: avatarPng,
      type: type,
    });
  };

  const setValuesUser = async (email, type) => {
    const result = await getUser(email);
    if (result.success && result.data.length > 0) {
      setUser({
        ...user,
        ...result.data[0],
        type: type,
      });
    }
  };

  useEffect(() => {
    if (type === "user") {
      setValuesUser(email, type);
    } else if (type === "guest") {
      setValuesGuest(type);
    }
  }, [type, email]);

  useEffect(() => {
    socket.emit("animation", user.animation)
  }, [user.animation])

  return <>
    <div style={{ height: "100vh", width: "100vw" }}>
      {user.avatarUrl !== "" && (
        <Suspense fallback={<Instructive />}>
          <Menu />
          <SocketManager />
          <Messenger setIsChatFocused={setIsChatFocused}  />
          {/* <Voice /> */}
          <KeyboardControls map={movements} >
            <Canvas
              camera={cameraSettings}
              gl={glSettings}
            >
              {/* <Perf position="top-left" /> */}
              <Lights />
              <Alu position={[-1, 0, -1.5]} rotation-y={Math.PI * 0.15} />
              <Physics debug={false}>
                <Outside />
                <EISCFirstFloor />
                <EISCSecondFloor />
                <EISCThirdFloor />
                <Stairs />
                <Avatar/>
                <Controls />
                {
                  avatars.map((avatar, index) => (
                    socket.id !== avatar.id && avatar.url !== "" && <Users
                      key={index}
                      avatar={avatar}
                    />
                  ))}
              </Physics>
            </Canvas>
          </KeyboardControls>
        </Suspense>
      )}
    </div>
  </>;
};

export default Metaverse;
