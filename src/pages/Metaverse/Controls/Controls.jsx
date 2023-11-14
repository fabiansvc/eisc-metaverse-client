import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Quaternion, Vector3 } from "three";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { socket } from "../../../components/Socket/SocketManager";
import { useAvatar } from "../../../context/AvatarContext";

const Controls = () => {
  const { avatar, setAvatar } = useAvatar();
  const controlsRef = useRef();
  const avatarBodyRef = useRef();
  const [collision, setCollision] = useState(false);
  const [collisionStairs, setCollisionStairs] = useState(false);
  const [sub, get] = useKeyboardControls();
  const { camera } = useThree();

  let walkDirection = new Vector3();
  let rotateAngle = new Vector3(0, 1, 0);
  let rotateQuarternion = new Quaternion();
  let cameraTarget = new Vector3();

  const velocity = avatar.animation === "Walking" ? 1.5 : 3;
  const controlsYTarget = 1.4;

  const getDirectionOffset = (forward, backward, left, right) => {
    let directionOffset = 0;
    if (forward) {
      if (left) {
        directionOffset = Math.PI / 4;
      } else if (right) {
        directionOffset = -Math.PI / 4;
      }
    } else if (backward) {
      if (left) {
        directionOffset = Math.PI / 4 + Math.PI / 2; 
      } else if (right) {
        directionOffset = -Math.PI / 4 - Math.PI / 2; 
      } else {
        directionOffset = Math.PI; 
      }
    } else if (left) {
      directionOffset = Math.PI / 2; 
    } else if (right) {
      directionOffset = -Math.PI / 2; 
    }

    return directionOffset;
  };

  const moveCamera = (moveX, moveZ) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;
  }

  const moveCameraToAvatar = () => {
    if (!collision && controlsRef.current.getDistance() > 1.1) {
      camera.position.z = MathUtils.lerp(
        camera.position.z,
        avatarBodyRef.current.translation().z,
        0.1);
    }
  }

  const moveControlsCamera = () => {
    cameraTarget.x = avatarBodyRef.current.translation().x;
    cameraTarget.y = avatarBodyRef.current.translation().y + controlsYTarget;
    cameraTarget.z = avatarBodyRef.current.translation().z;
    controlsRef.current.target = cameraTarget;
  }

  const getAnimation = () => {
    const { run } = get();
    if (run) {
      return "Running"
    } else {
      return "Walking"
    }
  }

  useEffect(() => {
    return sub(
      (state) => state.forward || state.backward || state.left || state.right,
      (pressed) => {
        setAvatar({
          ...avatar,
          animation: pressed ? getAnimation() : "Idle",
        })
      })
  },)

  useEffect(() => {
    socket.emit("animation", avatar.animation)
  }, [avatar.animation])

  useFrame((state, delta) => {
    const { forward, backward, left, right } = get();
    if (avatar.ref && avatarBodyRef.current) {
      if (forward || backward || left || right) {
        avatarBodyRef.current.setBodyType(0, true)
        const directionOffset = getDirectionOffset(forward, backward, left, right);

        const angleYCameraDirection = Math.atan2(
          camera.position.x - avatarBodyRef.current.translation().x,
          camera.position.z - avatarBodyRef.current.translation().z
        );

        rotateQuarternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + Math.PI + directionOffset);
        avatar.ref.quaternion.rotateTowards(rotateQuarternion, 0.2);

        camera.getWorldDirection(walkDirection);
        walkDirection.y = 0;
        walkDirection.normalize();
        walkDirection.applyAxisAngle(rotateAngle, directionOffset);

        const moveX = walkDirection.x * velocity * delta;
        const moveZ = walkDirection.z * velocity * delta;

        if (collisionStairs) {
          avatarBodyRef.current.applyImpulse({ x: 0, y: 0.15, z: 0 }, true)
        }

        avatarBodyRef.current.setTranslation({
          x: avatarBodyRef.current.translation().x += moveX,
          y: avatarBodyRef.current.translation().y,
          z: avatarBodyRef.current.translation().z += moveZ
        }, true)

        avatarBodyRef.current.setRotation({
          x: 0,
          y: avatar.ref.quaternion.y,
          z: 0,
          w: avatar.ref.quaternion.w
        }, true)

        socket.emit("move", {
          position: avatarBodyRef.current.translation(),
          rotation: avatar.ref.rotation,
        })
        
        if (!collision || controlsRef.current.getDistance() > 1.1) {
          moveCamera(moveX, moveZ);
        }
        moveControlsCamera();
      } else {
        avatarBodyRef.current.setBodyType(1, true)
      }
      avatar.ref.position.copy(avatarBodyRef.current.translation())
      moveCameraToAvatar()
    }
    get().back
  });

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
      <RigidBody
        ref={avatarBodyRef}
        density={50}
        friction={0}
        restitution={0}
        position-y={0}
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "EISCBody") {
            setCollision(true);
          }
          if (other.rigidBodyObject.name === "Stairs") {
            setCollisionStairs(true);
          }

        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject.name === "EISCBody") {
            setCollision(false);
          }
          if (other.rigidBodyObject.name === "Stairs") {
            setCollisionStairs(false);
          }
        }}
      >
        {avatar.ref && <CuboidCollider args={[0.1, 0.1, 0.1]} position={[0, 0.1, 0]} />}
      </RigidBody>
    </>
  );
};

export default Controls;
