import { PointerLockControls, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Controls = () => {
    const pointerLockControlsRef = useRef();
    const [, get] = useKeyboardControls();

    useFrame(() => {
        const { forward, back, left, right, jump } = get()
        if (forward) {
            pointerLockControlsRef.current.moveForward(0.1);
        } else if (back) {
            pointerLockControlsRef.current.moveForward(-0.1);
        } else if (left) {
            pointerLockControlsRef.current.moveRight(-0.1);
        } else if (right) {
            pointerLockControlsRef.current.moveRight(0.1);
        } else if (jump) {
           
        }

    });

    return <PointerLockControls ref={pointerLockControlsRef} />;
};

export default Controls;
