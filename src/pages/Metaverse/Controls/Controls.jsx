import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { socketServer } from "../../../socket/socket-server";
import { useAvatar } from "../../../context/AvatarContext";

const Controls = () => {
  const { avatar, setAvatar } = useAvatar();
  const [sub, get] = useKeyboardControls();

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

  useEffect(() => {
    socketServer.emit("upgrade-avatar", {
      animation: avatar.animation,
    });
  }, [avatar.animation]);

  useFrame(() => {
    const { forward, backward, leftward, rightward } = get();
    if ((forward || backward || leftward || rightward) && avatar.body) {
      const currentPosition = avatar.body?.translation();
      const currentRotation = avatar.body?.rotation();

        socketServer.emit("upgrade-avatar", {
          position: currentPosition,
          rotation: currentRotation,
        });
    }
  });
};

export default Controls;
