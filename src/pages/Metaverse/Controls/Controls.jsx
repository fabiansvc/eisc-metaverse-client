import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Quaternion, Vector3 } from "three";
import { useUser } from "../../../context/UserContext";
import { useAvatar } from "../../../context/AvatarContext";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

const Controls = () => {
  const { user, setUser } = useUser();
  const { avatar } = useAvatar();
  const controlsRef = useRef();
  const avatarBodyRef = useRef();
  const [collision, setCollision] = useState(false);
  const [sub, get] = useKeyboardControls();
  const { camera } = useThree();
  // temporary data
  let walkDirection = new Vector3();
  let rotateAngle = new Vector3(0, 1, 0);
  let rotateQuarternion = new Quaternion();
  let cameraTarget = new Vector3();
  let moveX = 0;
  let moveZ = 0;

  // constants
  const velocity = user.animation === "Walking" ? 1.5 : 3;
  const controlsYTarget = 1.3;

  const getDirectionOffset = (forward, backward, left, right) => {

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

  const getDirectionQuat = (forward, backward, left, right) => {
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
    if (avatar.ref && avatarBodyRef.current) {
      if (forward || backward || left || right) {
        const directionOffset = getDirectionOffset(forward, backward, left, right);
        const directionQuat = getDirectionQuat(forward, backward, left, right);

        const angleYCameraDirection = Math.atan2(
          camera.position.x - avatarBodyRef.current.translation().x,
          camera.position.z - avatarBodyRef.current.translation().z
        );

        // Rotate model
        rotateQuarternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionQuat);
        avatar.ref.quaternion.rotateTowards(rotateQuarternion, 0.2);

        // Calculate direction
        camera.getWorldDirection(walkDirection);
        walkDirection.y = 0;
        walkDirection.normalize();
        walkDirection.applyAxisAngle(rotateAngle, directionOffset);

        // Calculate movement
        moveX = walkDirection.x * velocity * delta;
        moveZ = walkDirection.z * velocity * delta;

        // Move avatar
        avatarBodyRef.current.setTranslation({
          x: avatarBodyRef.current.translation().x += moveX,
          y: avatarBodyRef.current.translation().y,
          z: avatarBodyRef.current.translation().z += moveZ
        }, true)
        avatar.ref.position.copy(avatarBodyRef.current.translation())

        // Move camera
        if (!collision || controlsRef.current.getDistance() >= 0.98) {
          moveCameraPos(moveX, moveZ);
        } else if (controlsRef.current.getDistance() < 0.98) {
          moveCameraNeg(moveX, moveZ);
        }
        moveControlsCamera();
      }
      if (!collision && controlsRef.current.getDistance() >= 1.1) {
        moveCameraPos(moveX, moveZ)
      }
    }
  });

  const moveCameraPos = (moveX, moveZ) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;
  }

  const moveCameraNeg = (moveX, moveZ) => {
    camera.position.x -= moveX;
    camera.position.z -= moveZ;
  }

  const moveControlsCamera = () => {
    cameraTarget.x = avatarBodyRef.current.translation().x;
    cameraTarget.y = avatarBodyRef.current.translation().y + controlsYTarget;
    cameraTarget.z = avatarBodyRef.current.translation().z;
    controlsRef.current.target = cameraTarget;
  }

  useEffect(() => {
    return sub(
      (state) => state.forward || state.backward || state.left || state.right,
      (pressed) => {
        setUser({
          ...user,
          animation: pressed ? getAnimation() : "Idle",
        })
      })
  },)

  const getAnimation = () => {
    const { run } = get();
    if (run) {
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
        enablePan={true}
        enableZoom={false}
        maxPolarAngle={Math.PI * 0.8}
        minPolarAngle={Math.PI * 0.2}
      />
      <RigidBody
        ref={avatarBodyRef}
        name="AvatarBody"
        restitution={0.01}
        position-y={0.2}
        onCollisionEnter={({ manifold, target, other }) => {
          if (other.rigidBodyObject.name === "StructureFirstFloorBody") {
            setCollision(true);
          }
        }}
        onCollisionExit={({ manifold, target, other }) => {
          if (other.rigidBodyObject.name === "StructureFirstFloorBody") {
            setCollision(false);
          }
        }}
      >
        {avatar.ref && <CuboidCollider args={[0.2, 0.1, 0.2]} position={[0, 0.1, 0]} />}
      </RigidBody>
    </>
  );
};

export default Controls;
