import { Canvas, useFrame } from "@react-three/fiber";
import { useLocation } from "react-router-dom";
import { useState } from "react";
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
        exit: 'exit'
    }
    const map = useMemo(() => [
        { name: MOVEMENTS.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: MOVEMENTS.back, keys: ['ArrowDown', 'KeyS'] },
        { name: MOVEMENTS.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: MOVEMENTS.right, keys: ['ArrowRight', 'KeyD'] },
        { name: MOVEMENTS.jump, keys: ['Space'] },
        { name: MOVEMENTS.exit, keys: ['Escape']}
    ], [])

    const location = useLocation();
    const { avatarUrl } = location.state;

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <KeyboardControls map={map} >
                <Canvas
                    camera={{ position: [0, 1, 2] }}
                    dpr={[1, 2]}
                    flat
                    gl={{
                        antialias: true,
                        toneMapping: ACESFilmicToneMapping
                    }}
                >
                    <Lights />
                    <Avatar avatarUrl={avatarUrl} type="men" position={[0, 0, 0]} rotation={[0, Math.PI, 0]} />
                    <Controls />
                    <gridHelper position-y={-1} args={[100, 100]} />
                </Canvas>
            </KeyboardControls>
        </div>
    );
};

export default Metaverse;

