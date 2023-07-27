import { Canvas } from "@react-three/fiber";
import { useLocation } from "react-router-dom";
import Avatar from "./Avatar/Avatar";
import { CineonToneMapping } from "three";
import Controls from "./Controls/Controls";
import Lights from "./Lights/Lights";
import { KeyboardControls, Loader } from "@react-three/drei";
import useMovements from '../../utils/useMovements'
import Instructive from "./Instructive/Instructive";
import { useAvatar } from "../../context/avatarContext";
import { Suspense, useEffect, useState } from "react";
import { Physics } from "@react-three/rapier"
import EISC from "./EISC/EISC";
import Logout from "../Components/Logout/Logout";

const Metaverse = () => {
    const location = useLocation();
    const { url, userId } = location.state;
    const { avatar, setAvatar } = useAvatar();
    const movements = useMovements();
    const [dpr, setDpr] = useState(1.5)

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
                        camera={{
                            position: [0, 1.5, 2],
                            fov: 45,
                            near: 0.1,
                            far: 50,
                            rotation: [0, 0, 0]
                        }}
                        dpr={[1, 2]}
                        flat
                        gl={{
                            antialias: true,
                            toneMapping: CineonToneMapping
                        }}
                        performance={{ min: 0.5 }}
                    >
                        <Lights />
                        <Controls />
                        <Physics debug={false}>
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

