'use strict'

import { useMemo } from "react";

const useMovements = () => {
  const MOVEMENTS = {
    forward: "forward",
    back: "back",
    left: "left",
    right: "right",
    jump: "jump",
    exit: "exit",
  };

  const map = useMemo(
    () => [
      { name: MOVEMENTS.forward, keys: ["ArrowUp", "KeyW"] },
      { name: MOVEMENTS.back, keys: ["ArrowDown", "KeyS"] },
      { name: MOVEMENTS.left, keys: ["ArrowLeft", "KeyA"] },
      { name: MOVEMENTS.right, keys: ["ArrowRight", "KeyD"] },
      { name: MOVEMENTS.jump, keys: ["Space"] },
      { name: MOVEMENTS.exit, keys: ["Escape"] },
    ],
    []
  );

  return map;
};

export default useMovements;
