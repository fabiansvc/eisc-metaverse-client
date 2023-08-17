import { Canvas } from "@react-three/fiber";
import Avatar from "./Avatar/Avatar";
import Controls from "./Controls/Controls";
import Lights from "./Lights/Lights";
import { KeyboardControls } from "@react-three/drei";
import useMovements from "../../utils/keys-movements";
import Instructive from "./Instructive/Instructive";
import { Suspense, useEffect } from "react";
import { Physics } from "@react-three/rapier";
import EISC from "./EISC/EISC";
import { Perf } from "r3f-perf";
import { getUser } from "../../db/user-collection";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Menu from "./Menu/Menu";

const Metaverse = () => {
  const auth = useAuth();
  const { email } = auth.userLogged;
  const movements = useMovements();
  const { user, setUser } = useUser();
  const location = useLocation();
  const type = location.state;

  useEffect(() => {
    const setupSocket = require("../../utils/socket-connection");
    // Call the setupSocket function to initiate the socket connection
    
    setupSocket(user);
  }, [user]);

  const cameraSettings = {
    position: [0, 1.3, 1],
    fov: 60,
    near: 0.1,
    far: 50,
  };

  const glSettings = {
    antialias: true,
    gammaFactor: 2.2,
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

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {user.avatarUrl !== "" && (
        <Suspense fallback={<Instructive />}>
          <Menu />
          <KeyboardControls map={movements}>
            <Canvas
              shadows={true}
              camera={cameraSettings}
              dpr={[1, 2]}
              flat
              gl={glSettings}
              performance={{ min: 0.5 }}
            >
              {/* <Perf position="top-left" /> */}
              <Physics debug={false}>
                <Lights />
                <EISC />
                <Avatar />
                <Controls />
              </Physics>
            </Canvas>
          </KeyboardControls>
        </Suspense>
      )}
    </div>
  );
};

export default Metaverse;
