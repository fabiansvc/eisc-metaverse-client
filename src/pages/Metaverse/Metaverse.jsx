import { Canvas, useThree } from "@react-three/fiber";
import Avatar from "./Avatar/Avatar";
import Controls from "./Controls/Controls";
import Lights from "./Lights/Lights";
import { KeyboardControls, Preload } from "@react-three/drei";
import useMovements from "../../utils/keys-movements";
import Instructive from "./Instructive/Instructive";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { getUser } from "../../db/user-collection";
import { useLocation } from "react-router-dom";
import Menu from "./Menu/Menu";
import Users from "./Users/Users";
import { Physics } from "@react-three/rapier";
import { SocketManager, socket } from "../../components/Socket/SocketManager";
import Alu from "./Alu/Alu";
import Voice from "./Interaction/Voice/Voice";
import Messenger from "./Interaction/Messenger/Messenger";
import { Perf } from "r3f-perf";
import EISC from "./EISC/EISC";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";

const Metaverse = () => {
  const auth = useAuth();
  const { user, setUser } = useUser();
  const { email } = auth.userLogged;
  const [isChatFocused, setIsChatFocused] = useState(false);
  const movements = useMovements(isChatFocused);
  const location = useLocation();
  const type = location.state;

  const cameraSettings = useMemo(() => ({
    position: [0, 1.4, 1],
    fov: 60,
    near: 0.1,
    far: 200,
  }), []);

  const setValuesGuest = (type) => {
    const nickname = window.localStorage.getItem("nickname");
    const biography = window.localStorage.getItem("biography");
    const avatarUrl = window.localStorage.getItem("avatarUrl");
    const avatarPng = window.localStorage.getItem("avatarPng");
    const firstTime = window.localStorage.getItem("firstTime");

    setUser({
      ...user,
      nickname: nickname,
      biography: biography,
      avatarUrl: avatarUrl,
      avatarPng: avatarPng,
      firstTime: firstTime,
      type: type,
    });
  };

  const setValuesUser = async (email, type) => {
    const result = await getUser(email);
    if (result.success && result.data.length > 0) {
      setUser({
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
  }, [type]);

  useEffect(() => {
    if (user) {
      socket.emit("data-user", {
        email: user?.email,
        nickname: user?.nickname,
        avatarUrl: user?.avatarUrl,
      });
    }
  })

  function AdaptivePixelRatio() {
    const current = useThree((state) => state.performance.current)
    const setPixelRatio = useThree((state) => state.setDpr)
    useEffect(() => {
      setPixelRatio(window.devicePixelRatio * current)
    }, [current])
    return null
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {user && user?.avatarUrl !== "" &&
        <Suspense fallback={<Instructive />}>
          <Menu />
          <SocketManager />
          <Messenger setIsChatFocused={setIsChatFocused} />
          <Voice />
          <KeyboardControls map={movements} >
            <Canvas
              shadows={false}
              camera={cameraSettings}
              gl={
                {
                  alpha: false,
                  antialias: true,
                  stencil: false,
                }
              }
              performance={{ min: 0.5 }}
            >
              {/* <Perf position="top-left" /> */}
              <Lights />
              <Physics debug={false}>
                <Avatar />
                <EISC />
                <Alu position={[-1, 0, -1.5]} rotation-y={Math.PI * 0.15} />
                <Controls />
              </Physics>
              <Users />
              <Preload all />
              <AdaptivePixelRatio />
            </Canvas>
          </KeyboardControls>
        </Suspense>
      }
    </div>
  )
};

export default Metaverse;