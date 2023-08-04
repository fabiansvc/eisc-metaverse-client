import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { useUser } from "../../../context/userContext";

const Controls = () => {
    const { user, setUser } = useUser();
    const controlsRef = useRef();
    const [sub, get] = useKeyboardControls();

    // temporary data
    let walkDirection = new Vector3()
    let rotateAngle = new Vector3(0, 1, 0)
    let rotateQuarternion = new Quaternion()
    let cameraTarget = new Vector3()

    // constants
    const velocity = 1.5
    const controlsYTarget = 1.2

    const getDirectionOffset = () => {
        const { forward, back, left, right } = get();

        let directionOffset = 0 // w

        if (forward) {
            if (left) {
                directionOffset = Math.PI / 4 // w+a
            } else if (right) {
                directionOffset = - Math.PI / 4 // w+d
            }
        } else if (back) {
            if (left) {
                directionOffset = Math.PI / 4 + Math.PI / 2 // s+a
            } else if (right) {
                directionOffset = -Math.PI / 4 - Math.PI / 2 // s+d
            } else {
                directionOffset = Math.PI // s
            }
        } else if (left) {
            directionOffset = Math.PI / 2 // a
        } else if (right) {
            directionOffset = - Math.PI / 2 // d
        }

        return directionOffset
    }

    const getDirectionQuat = () => {
        const { forward, back, left, right } = get();

        let directionQuat = -Math.PI // w

        if (back) {
            if (right) {
                directionQuat = Math.PI / 4 // w+a
            } else if (left) {
                directionQuat = - Math.PI / 4 // w+d
            } else {
                directionQuat = 0 // s
            }
        } else if (forward) {
            if (right) {
                directionQuat = Math.PI / 4 + Math.PI / 2 // s+a
            } else if (left) {
                directionQuat = -Math.PI / 4 - Math.PI / 2 // s+d
            }
        } else if (left) {
            directionQuat = -Math.PI / 2 // a
        } else if (right) {
            directionQuat = Math.PI / 2 // d
        }

        return directionQuat
    }

    useFrame((state, delta) => {
        const { forward, back, left, right } = get();
        if (user.ref && user.body) {
            if (forward || back || left || right) {
                const directionOffset = getDirectionOffset()
                const directionQuat = getDirectionQuat()

                let angleYCameraDirection = Math.atan2(
                    (state.camera.position.x - user.body.translation().x),
                    (state.camera.position.z - user.body.translation().z))

                // rotate model
                rotateQuarternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionQuat)
                user.ref.quaternion.rotateTowards(rotateQuarternion, 0.2)

                // calculate direction
                state.camera.getWorldDirection(walkDirection)
                walkDirection.y = 0
                walkDirection.normalize()
                walkDirection.applyAxisAngle(rotateAngle, directionOffset)

                // Caclulate movement
                const moveX = walkDirection.x * velocity * delta
                const moveZ = walkDirection.z * velocity * delta

                let positionX = user.body.translation().x + moveX
                let positionZ = user.body.translation().z + moveZ

                // Move user body
                user.body.setTranslation({ x: positionX, y: 0, z: positionZ })

                // update camera target
                state.camera.position.x += moveX
                state.camera.position.z += moveZ 
                cameraTarget.x = positionX
                cameraTarget.y = controlsYTarget
                cameraTarget.z = positionZ
                controlsRef.current.target = cameraTarget

                setUser({
                    ...user,
                    position: [positionX, 0, positionZ],
                    animation: "Walking",
                });

            } else {
                setUser({
                    ...user,
                    animation: "Idle",
                });
            }
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
            position={[0, controlsYTarget, 0]}
            target={[0, controlsYTarget, 0]}
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI * 0.8}
            minPolarAngle={Math.PI * 0.2}
        />
    </>
};

export default Controls;