import { Canvas } from "@react-three/fiber"
import { useLocation } from "react-router-dom";
import Avatar from "./Avatar/Avatar";
import { ACESFilmicToneMapping } from "three";
import Controls from "./Controls/Controls";
import Lights from "./Lights/Lights";
import { KeyboardControls } from "@react-three/drei";
import { useMemo } from "react";

const Metaverse = () => {
    const MOVEMENTS = {
        forward: 'forward',
        back: 'back',
        left: 'left',
        right: 'right',
        jump: 'jump',
    }
    const map = useMemo(() => [
        { name: MOVEMENTS.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: MOVEMENTS.back, keys: ['ArrowDown', 'KeyS'] },
        { name: MOVEMENTS.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: MOVEMENTS.right, keys: ['ArrowRight', 'KeyD'] },
        { name: MOVEMENTS.jump, keys: ['Space'] },
    ], [])

    const location = useLocation();
    const { avatarUrl } = location.state;
    return (
        <KeyboardControls map={map}>
            <div style={{ height: "100vh", width: "100vw" }}>

                <Canvas
                    camera={{ position: [0, 1, 2] }}
                    dpr={[1, 2]}
                    flat
                    gl={
                        {
                            antialias: true,
                            toneMapping: ACESFilmicToneMapping
                        }
                    }
                >
                    <Lights />
                    <Controls />
                    <Avatar avatarUrl={avatarUrl} type="men" />
                </Canvas>
            </div>
        </KeyboardControls>
    )
}

export default Metaverse;

