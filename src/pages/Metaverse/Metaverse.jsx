import { Canvas } from "@react-three/fiber";
import { useLocation } from "react-router-dom";
import Avatar from "./Avatar/Avatar";
import { ACESFilmicToneMapping, CineonToneMapping, LinearFilter, LinearToneMapping } from "three";
import Controls from "./Controls/Controls";
import Lights from "./Lights/Lights";
import { KeyboardControls, Loader } from "@react-three/drei";
import useMovements from '../../utils/useMovements'
import Instructive from "./Instructive/Instructive";
import { useAvatar } from "../../context/avatarContext";
import { Suspense, useEffect } from "react";
import { Physics } from "@react-three/rapier"
import EISC from "./EISC/EISC";
import Logout from "../Components/Logout/Logout";
import { Perf } from "r3f-perf";

const Metaverse = () => {
    const location = useLocation();
    const { url, userId } = location.state;
    const { avatar, setAvatar } = useAvatar();
    const movements = useMovements();

    useEffect(() => {
        setAvatar({
            ...avatar,
            userId,
            url,
        });
    }, []);

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Suspense fallback={<Instructive />}>
                <Logout />
                <KeyboardControls map={movements} >
                    <Canvas
                        shadows={true}
                        camera={{
                            position: [avatar.position[0], avatar.position[1] + 1.2, avatar.position[2] + 1],
                            fov: 60,
                            near: 0.1,
                            far: 50,
                        }}
                        dpr={[1, 2]}
                        flat
                        gl={{
                            antialias: true
                        }}
                        performance={{ min: 0.5 }}
                    >
                        <Perf position="top-left"/>
                        <Lights />
                        <Controls />
                        <Physics debug={true}>
                            <EISC />
                            <Avatar />
                        </Physics>
                    </Canvas>
                </KeyboardControls>
            </Suspense>
        </div>
    );
};

export default Metaverse;

