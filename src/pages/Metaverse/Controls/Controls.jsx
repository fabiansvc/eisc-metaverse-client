import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../context/avatarContext";

const Controls = () => {
    const { avatar, setAvatar } = useAvatar();
    const controlsRef = useRef();
    const [sub, get] = useKeyboardControls();

    useFrame(() => {
        const { forward, back, left, right } = get();

        if (forward) {
            setAvatar({
                ...avatar,
                animation: "Walking"
            });

        } else {
            setAvatar({
                ...avatar,
                animation: "Idle",
            });
        }
    });


    useEffect(() => {
        return sub(
            (state) => state.exit,
            (pressed) => {
                console.log('exit', pressed);
            }
        );
    }, [sub]);


    useEffect(() => {
        return sub(
            (state) => state.jump,
            (pressed) => {
                console.log('jump', pressed);
            }
        );
    }, [sub]);

    return <>
        <OrbitControls
            ref={controlsRef}
            target={[0, 1, 0]}
        />
    </>
};

export default Controls;