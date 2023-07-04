import { PointerLockControls, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import Profile from "../Profile/Profile";

const Controls = () => {
    const pointerLockControlsRef = useRef();
    const [sub, get] = useKeyboardControls();
    const SPEED = 0.05;

    useEffect(() => {
        if(pointerLockControlsRef.current.isLocked)
            console.log("Controls are locked");
    }, [pointerLockControlsRef.current])

    useFrame(() => {
        const { forward, back, left, right } = get()
        if (forward) {
            pointerLockControlsRef.current.moveForward(SPEED);
        } else if (back) {
            pointerLockControlsRef.current.moveForward(-SPEED);
        } else if (left) {
            pointerLockControlsRef.current.moveRight(-SPEED);
        } else if (right) {
            pointerLockControlsRef.current.moveRight(SPEED);
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
        <PointerLockControls ref={pointerLockControlsRef}/>
    </>
};

export default Controls;
