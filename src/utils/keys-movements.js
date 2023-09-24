'use strict'

import { useMemo } from "react";

const useMovements = () => {
  const MOVEMENTS = {
    forward: "forward",
    backward: "backward",
    left: "left",
    right: "right",
    jump: "jump",
    exit: "exit",
    run: "run",
  };

  const map = useMemo(
    () => [
      { name: MOVEMENTS.forward, keys: ["ArrowUp", "KeyW"] },
      { name: MOVEMENTS.backward, keys: ["ArrowDown", "KeyS"] },
      { name: MOVEMENTS.left, keys: ["ArrowLeft", "KeyA"] },
      { name: MOVEMENTS.right, keys: ["ArrowRight", "KeyD"] },
      { name: MOVEMENTS.jump, keys: ["Space"] },
      { name: MOVEMENTS.exit, keys: ["Escape"] },
      { name: MOVEMENTS.run, keys: ["Shift"] },
    ],
    []
  );

  return map;
};

export default useMovements;
