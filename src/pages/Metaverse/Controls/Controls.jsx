import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../context/AvatarContext";
import { socketServer } from "../../../socket/socket-server";

/**
 * Component managing the keyboard controls and avatar movement in the metaverse.
 * This component listens for keyboard input to control avatar animations and broadcasts movement updates to the server.
 * @returns {null} The Controls component does not render any visible UI elements.
 */
const Controls = () => {
  const { avatar, setAvatar } = useAvatar();
  const avatarBodyRef = useRef();
  const [sub, get] = useKeyboardControls();
  let pressed = null;

  // Subscribe to keyboard controls and update avatar animation based on key presses
  useEffect(() => {
    const unsubscribe = sub(
      (state) => state.forward || state.backward || state.leftward || state.rightward,
      (pressed) => {
        setAvatar({ ...avatar, animation: pressed ? "Walking" : "Idle" });
      }
    );
    return () => unsubscribe();
  }, [avatar, setAvatar, sub, get]);

  // Broadcast avatar animation changes to the server
  useEffect(() => {
    socketServer.emit("animation", avatar.animation);
  }, [avatar?.animation]);

  // Update server with avatar movement data on each frame
  useFrame(() => {
    const { forward, backward, leftward, rightward } = get();
    if (forward || backward || leftward || rightward && (avatar.body && avatar.ref)) {
      socketServer.emit("move", {
        position: avatar.body.translation(),
        rotation: avatar.ref.rotation,
      });
    }
    pressed = get().back;
  });

  return null;
};

export default Controls;
