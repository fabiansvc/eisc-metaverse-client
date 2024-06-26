import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { socketServer } from "../../../services/socket-server";
import { useAvatar } from "../../../context/AvatarContext";
import * as THREE from "three";

/**
 * Controls component to manage avatar movement, rotation, and camera control.
 * Uses keyboard inputs and WebSocket to update the avatar state.
 * 
 * @component
 * @returns {JSX.Element} The OrbitControls component configured for avatar control.
 */
const Controls = () => {
  const { avatar, setAvatar } = useAvatar();
  const [sub, get] = useKeyboardControls();
  const lastUpdateRef = useRef(0);
  const controlsRef = useRef();
  const { camera, gl } = useThree();
  const rotateQuarternion = new THREE.Quaternion();
  const rotateAngle = new THREE.Vector3(0, 1, 0);
 
  /**
   * Effect to subscribe to keyboard controls and update avatar animation.
   */
  useEffect(() => {
    const unsubscribe = sub(
      (state) =>
        state.forward || state.backward || state.leftward || state.rightward,
      (pressed) => {
        setAvatar({ ...avatar, animation: pressed ? "Walking" : "Idle" });
      }
    );
    return () => unsubscribe();
  }, [sub, avatar, setAvatar]);

  /**
   * Effect to emit avatar animation state via WebSocket.
   */
  useEffect(() => {
    socketServer.emit("upgrade-avatar", {
      animation: avatar.animation,
    });
  }, [avatar.animation]);

  /**
   * Sends the avatar's current transform (position and rotation) via WebSocket.
   * 
   * @param {number} elapsedTime - The elapsed time from the frame.
   */
  const sendTransformViaWebSocket = (elapsedTime) => {
    const currentPosition = avatar.body?.translation();
    const currentRotation = avatar.ref?.quaternion;

    if (elapsedTime - lastUpdateRef.current >= 0.01) {
      socketServer.emit("upgrade-avatar", {
        position: currentPosition,
        rotation: currentRotation,
      });
      lastUpdateRef.current = elapsedTime;
    }
  };

  /**
   * Moves the avatar based on the given direction vector and delta time.
   * 
   * @param {THREE.Vector3} directionVector - The vector indicating the direction to move.
   * @param {number} deltaTime - The time difference between the current and the previous frame.
   */
  const moveAvatar = (directionVector) => {
    if (avatar.body) {
      const currentPosition = avatar.body.translation();
      if (currentPosition) {
        const newPosition = new THREE.Vector3(
          currentPosition.x + directionVector.x,
          currentPosition.y + directionVector.y,
          currentPosition.z + directionVector.z
        );
        avatar.body.setTranslation(
          { x: newPosition.x, y: newPosition.y, z: newPosition.z },
          true
        );
      }
    }
  };

  /**
   * Rotates the avatar based on the given direction offset.
   * 
   * @param {number} directionOffset - The offset to apply to the rotation.
   */
  const rotateAvatar = (directionOffset) => {
    const avatarPosition = avatar.body?.translation();
    if (avatarPosition) {
      const angleYCameraDirection = Math.atan2(
        camera.position.x - avatarPosition.x,
        camera.position.z - avatarPosition.z
      );

      rotateQuarternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + Math.PI + directionOffset
      );
      avatar.ref.quaternion.rotateTowards(rotateQuarternion, 0.2);
    }
  };

  /**
   * Calculates the direction offset based on keyboard inputs.
   * 
   * @param {boolean} forward - Is the forward key pressed.
   * @param {boolean} backward - Is the backward key pressed.
   * @param {boolean} leftward - Is the leftward key pressed.
   * @param {boolean} rightward - Is the rightward key pressed.
   * @returns {number} The calculated direction offset.
   */
  const getDirectionOffset = (forward, backward, leftward, rightward) => {
    if (forward && leftward) return Math.PI / 4;
    if (forward && rightward) return -Math.PI / 4;
    if (backward && leftward) return (3 * Math.PI) / 4;
    if (backward && rightward) return (-3 * Math.PI) / 4;
    if (forward) return 0;
    if (backward) return Math.PI;
    if (leftward) return Math.PI / 2;
    if (rightward) return -Math.PI / 2;
    return 0;
  };

  /**
   * Calculates the movement vector based on keyboard inputs and delta time.
   * 
   * @param {boolean} forward - Is the forward key pressed.
   * @param {boolean} backward - Is the backward key pressed.
   * @param {boolean} leftward - Is the leftward key pressed.
   * @param {boolean} rightward - Is the rightward key pressed.
   * @param {number} deltaTime - The time difference between the current and the previous frame.
   * @returns {THREE.Vector3} The calculated movement vector.
   */
  const getVectorDirection = (forward, backward, leftward, rightward, deltaTime) => {
    let speed = 0.01; // Changed from 0.05 to 3 for easier observation
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const moveVector = new THREE.Vector3();

    if (forward) moveVector.add(direction.clone().multiplyScalar(speed += deltaTime));
    if (backward) moveVector.add(direction.clone().multiplyScalar(-(speed += deltaTime)));

    const right = new THREE.Vector3()
      .crossVectors(camera.up, direction)
      .normalize();
    if (leftward) moveVector.add(right.clone().multiplyScalar(speed += deltaTime));
    if (rightward) moveVector.add(right.clone().multiplyScalar(-(speed += deltaTime)));

    return moveVector;
  };

  /**
   * Moves the camera to follow the avatar.
   */
  const moveCamera = () => {
    const avatarPosition = avatar.body?.translation();
    if (avatarPosition) {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      const offset = direction.clone().negate().multiplyScalar(1);
      camera.position.set(
        avatarPosition.x + offset.x,
        avatarPosition.y + 1.5,
        avatarPosition.z + offset.z
      );
      controlsRef.current.target.set(
        avatarPosition.x,
        avatarPosition.y + 1.25,
        avatarPosition.z
      );
      controlsRef.current.update();
    }
  };

  /**
   * Frame update function to handle avatar movement, rotation, camera position,
   * and WebSocket communication.
   */
  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = get();

    if (!forward && !backward && !leftward && !rightward) return;

    const directionOffset = getDirectionOffset(forward, backward, leftward, rightward);
    rotateAvatar(directionOffset);

    const directionVector = getVectorDirection(forward, backward, leftward, rightward, delta);
    moveAvatar(directionVector);

    moveCamera();
    sendTransformViaWebSocket(state.clock.elapsedTime);
  });

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enablePan={false}
      enableZoom={false}
      enableDamping={false}
      dampingFactor={0.2}
      minDistance={1}
      maxDistance={1}
      target={[0, 1.25, 0]}
    />
  );
};

export default Controls;
