import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { useUser } from "../../../context/UserContext";
import { useAvatar } from "../../../context/AvatarContext";

const Controls = () => {
  const { user, setUser } = useUser();
  const { avatar } = useAvatar();
  const controlsRef = useRef();
  const [sub, get] = useKeyboardControls();

  // temporary data
  let walkDirection = new Vector3();
  let rotateAngle = new Vector3(0, 1, 0);
  let rotateQuarternion = new Quaternion();
  let cameraTarget = new Vector3();

  // constants
  const velocity = user.animation === "Walking" ? 1.5 : 3;
  const controlsYTarget = 1.3;

  const getDirectionOffset = () => {
    const { forward, backward, left, right } = get();

    let directionOffset = 0; // w

    if (forward) {
      if (left) {
        directionOffset = Math.PI / 4; // w+a
      } else if (right) {
        directionOffset = -Math.PI / 4; // w+d
      }
    } else if (backward) {
      if (left) {
        directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
      } else if (right) {
        directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
      } else {
        directionOffset = Math.PI; // s
      }
    } else if (left) {
      directionOffset = Math.PI / 2; // a
    } else if (right) {
      directionOffset = -Math.PI / 2; // d
    }

    return directionOffset;
  };

  const getDirectionQuat = () => {
    const { forward, backward, left, right } = get();

    let directionQuat = -Math.PI; // w

    if (backward) {
      if (right) {
        directionQuat = Math.PI / 4; // w+a
      } else if (left) {
        directionQuat = -Math.PI / 4; // w+d
      } else {
        directionQuat = 0; // s
      }
    } else if (forward) {
      if (right) {
        directionQuat = Math.PI / 4 + Math.PI / 2; // s+a
      } else if (left) {
        directionQuat = -Math.PI / 4 - Math.PI / 2; // s+d
      }
    } else if (left) {
      directionQuat = -Math.PI / 2; // a
    } else if (right) {
      directionQuat = Math.PI / 2; // d
    }

    return directionQuat;
  };


  useFrame((state, delta) => {
    const { forward, backward, left, right } = get();
    if (user && avatar && avatar.ref) {
      if (forward || backward || left || right) {
        const directionOffset = getDirectionOffset();
        const directionQuat = getDirectionQuat();

        const angleYCameraDirection = Math.atan2(
          state.camera.position.x - avatar.ref.position.x,
          state.camera.position.z - avatar.ref.position.z
        );


        // rotate model
        rotateQuarternion.setFromAxisAngle(
          rotateAngle,
          angleYCameraDirection + directionQuat
        );
        avatar.ref.quaternion.rotateTowards(rotateQuarternion, 0.2);

        // calculate direction
        state.camera.getWorldDirection(walkDirection);
        walkDirection.y = 0;
        walkDirection.normalize();
        walkDirection.applyAxisAngle(rotateAngle, directionOffset);

        // Caclulate movement
        const moveX = walkDirection.x * velocity * delta;
        const moveZ = walkDirection.z * velocity * delta;

        let positionX = avatar.ref.position.x + moveX;
        let positionZ = avatar.ref.position.z + moveZ;

        // Move avatar body
        avatar.ref.position.x = positionX;
        avatar.ref.position.z = positionZ;

        // update camera target
        state.camera.position.x += moveX
        state.camera.position.z += moveZ
        cameraTarget.x = positionX;
        cameraTarget.y = controlsYTarget;
        cameraTarget.z = positionZ;
        controlsRef.current.target = cameraTarget;
      }
    }
  });

  useEffect(() => {
    return sub(
      (state) => state.forward || state.backward || state.left || state.right,
      (pressed) => {
        setUser({
          ...user,
          animation: pressed ? getAnimation() : "Idle",
        })
      })
  }, )

  const getAnimation = () => {
    const { run } = get();
    if(run) {
      return "Running"
    } else {
      return "Walking"
    }
  }

  useFrame(() => {
    // Fetch fresh data from store
    const pressed = get().back
  })

  return (
    <>
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
  );
};

export default Controls;
