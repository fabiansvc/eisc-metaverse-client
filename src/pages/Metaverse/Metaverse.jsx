import { Canvas } from "@react-three/fiber";
import Avatar from "./Avatar/Avatar";
import Controls from "./Controls/Controls";
import Lights from "./Lights/Lights";
import { KeyboardControls } from "@react-three/drei";
import useMovements from "../../utils/keys-movements";
import Instructive from "./Instructive/Instructive";
import { Suspense, useEffect } from "react";
import { Perf } from "r3f-perf";
import { getUser } from "../../db/user-collection";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Menu from "./Menu/Menu";
import { useSocket } from "../../context/SocketContex";
import Users from "./Users/Users";
import EISCFirstFloor from "./EISC/EISCFirstFloor";
import EISCSecondFloor from "./EISC/EISCSecondFloor";
import { Stairs } from "./EISC/Stairs";
import Outside from "./EISC/Outside";
import { Physics } from "@react-three/cannon";

const Metaverse = () => {
  const auth = useAuth();
  const socket = useSocket();
  const { email } = auth.userLogged;
  const movements = useMovements();
  const { user, setUser } = useUser();
  const location = useLocation();
  const type = location.state;

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
    const avatarUrl = window.localStorage.getItem("avatarUrl");
    const avatarPng = window.localStorage.getItem("avatarPng");

    setUser({
      ...user,
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
    socket.sendAvatarMessage(user);
  }, [user.position, user.rotation, user.quaternion, user.animation]);

  const loadAvatarsRoom = () => {
    socket.avatarsConnected && socket.avatarsConnected.map((avatar, index) => {
      if (avatar.nickname !== user.nickname) {
        // console.log(avatar.nickname);
        return <Users key={index} avatar={avatar} />
      }
    })
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {user.avatarUrl !== "" && (
        <Suspense fallback={<Instructive />}>
          <Menu />
          <KeyboardControls map={movements}>
            <Canvas
              shadows={true}
              camera={cameraSettings}
              gl={glSettings}
            >
              {/* <Perf position="top-left" />  */}
              <Lights />
              <Outside />
              <Physics >
                <EISCFirstFloor />
                <EISCSecondFloor />
                <Stairs />
                <Avatar />
              </Physics>
              <Controls />
              {/* {loadAvatarsRoom()}*/}
            </Canvas>
          </KeyboardControls>
        </Suspense>
      )}
    </div>
  );
};

export default Metaverse;
