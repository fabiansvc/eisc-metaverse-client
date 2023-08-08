import { Canvas } from "@react-three/fiber";
import Avatar from "./Avatar/Avatar";
import Controls from "./Controls/Controls";
import Lights from "./Lights/Lights";
import { KeyboardControls } from "@react-three/drei";
import useMovements from "../../utils/useMovements";
import Instructive from "./Instructive/Instructive";
import { Suspense, useEffect } from "react";
import { Physics } from "@react-three/rapier";
import EISC from "./EISC/EISC";
import { Perf } from "r3f-perf";
import { getUser } from "../../db/UsersCollection";
import { useAuth } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import Menu from "./Menu/Menu";
import { useUser } from "../../context/userContext";

const Metaverse = () => {
  const auth = useAuth();
  const { email } = auth.userLogged;
  const movements = useMovements();
  const { user, setUser } = useUser();
  const location = useLocation();
  const type = location.state;

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

  const setValuesGuest = () => {
    const avatar_url = window.localStorage.getItem("avatar_url");

    setUser({
      ...user,
      avatarUrl: avatar_url,
      animation: "Idle",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      ref: null,
      body: null,
      type: type,
    });
  };

  const setValuesUser = async (email) => {
    const result = await getUser(email);
    if (result.success && result.data.length > 0) {
      setUser({
        ...user,
        email: result.data[0].email,
        avatarUrl: result.data[0].avatar_url,
        data: result.data[0],
        animation: "Idle",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        ref: null,
        body: null,
        type: type
      });
    }
  };

  useEffect(() => {
    if (type === "user") {
      setValuesUser(email);
    } else if (type === "guest") {
      setValuesGuest();
    }
  }, [type, email]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {user && (
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
