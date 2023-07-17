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
import { Suspense, useEffect } from "react";
import { Physics } from "@react-three/rapier"
import EISC from "./EISC/EISC";
import Logout from "../Components/Logout/Logout";

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
            <Instructive />
            <Logout />
            <KeyboardControls map={movements} >
                <Canvas
                    camera={{
                        position: [0, 2, 4],
                        fov: 45,
                        near: 0.1,
                        far: 200,
                        rotation: [- Math.PI / 24, 0, 0]
                    }}
                    dpr={[1, 2]}
                    flat
                    gl={{
                        antialias: true,
                        toneMapping: CineonToneMapping
                    }}
                >
                    <Suspense fallback={null}>
                        <Lights />
                        <Controls />
                        <Physics debug={false}>
                            <Avatar />
                            <EISC />
                        </Physics>
                    </Suspense>
                </Canvas>
                <Loader />
            </KeyboardControls>
        </div>
    );
};

export default Metaverse;

