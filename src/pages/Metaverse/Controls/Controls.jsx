import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useAvatar } from "../../../context/AvatarContext";
import { socket } from "../../../components/Socket/SocketManager";

const Controls = () => {
  const { avatar, setAvatar } = useAvatar();
  const controlsRef = useRef();
  const avatarBodyRef = useRef();
  const [sub, get] = useKeyboardControls();
  const { camera } = useThree();
  const [collisionStairs, setCollisionStairs] = useState(false);
  let walkDirection = new Vector3();
  let rotateAngle = new Vector3(0, 1, 0);
  let rotateQuarternion = new Quaternion();
  let cameraTarget = new Vector3();

  const velocity = avatar.animation === "Walking" ? 3 : 5;
  const controlsYTarget = 1.4;

  const getDirectionOffset = (forward, backward, left, right) => {
    if (forward && left) return Math.PI / 4;
    if (forward && right) return -Math.PI / 4;
    if (backward && left) return 3 * Math.PI / 4;
    if (backward && right) return -3 * Math.PI / 4;
    if (forward) return 0;
    if (backward) return Math.PI;
    if (left) return Math.PI / 2;
    if (right) return -Math.PI / 2;
    return 0;
  };

  const move = (delta) => {
    const { forward, backward, left, right } = get();
    if (forward || backward || left || right) {
      const directionOffset = getDirectionOffset(forward, backward, left, right);
      const currentTranslation = avatarBodyRef.current.translation();
      const angleYCameraDirection = Math.atan2(
        camera.position.x - currentTranslation.x,
        camera.position.z - currentTranslation.z
      );

      rotateQuarternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + Math.PI + directionOffset);
      avatar.ref.quaternion.rotateTowards(rotateQuarternion, 0.2);

      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, directionOffset);

      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      let moveY = 0;

      if (collisionStairs) {
        moveY = 5 * delta;
      } 

      const newPosition = new Vector3(
        currentTranslation.x + moveX,
        currentTranslation.y + moveY,
        currentTranslation.z + moveZ
      );

      avatarBodyRef.current.setTranslation(newPosition, true);

      camera.position.add(new Vector3(moveX, moveY, moveZ));
      cameraTarget.set(newPosition.x, newPosition.y + controlsYTarget, newPosition.z);
      controlsRef.current.target = cameraTarget;
      socket.emit("move", {
        position: avatarBodyRef.current.translation(),
        rotation: avatar.ref.rotation,
      });
      

    }
  }

  useEffect(() => {
    const unsubscribe = sub(
      (state) => state.forward || state.backward || state.left || state.right,
      (pressed) => {
        setAvatar({ ...avatar, animation: pressed ? (get().run ? "Running" : "Walking") : "Idle" });

      }
    );
    return () => unsubscribe();
  }, [avatar, setAvatar, sub, get]);

  const desiredDistance = 1;

  useFrame((state, delta) => {
    move(delta);

    if (avatarBodyRef.current && avatar.ref) {
      const bodyPos = avatarBodyRef.current.translation();
      avatar.ref.position.set(bodyPos.x, bodyPos.y, bodyPos.z);

      avatarBodyRef.current.setRotation(new Quaternion(0, avatarBodyRef.current.rotation().y, 0, 1).normalize());

      const avatarPosition = new Vector3(bodyPos.x, bodyPos.y + 1, bodyPos.z);
      const cameraPosition = new Vector3().copy(camera.position);
      const direction = cameraPosition.sub(avatarPosition).normalize();
      const newCameraPosition = avatarPosition.add(direction.multiplyScalar(desiredDistance));
      camera.position.copy(newCameraPosition);

      socket.emit("animation", avatar.animation);
    }
  });

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        position={[0, controlsYTarget, 0]}
        target={[0, controlsYTarget, 0]}
        enablePan={true}
        enableZoom={true}
        maxPolarAngle={Math.PI * 0.8}
        minPolarAngle={Math.PI * 0.2}
      />
      <RigidBody
        ref={avatarBodyRef}
        position={[0, 0.1, 0]}
        restitution={0} 
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "Stairs") {
            setCollisionStairs(true);
            avatarBodyRef.current.setBodyType(1, true); 
          }

        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject.name === "Stairs") {
            setCollisionStairs(false);
            avatarBodyRef.current.setBodyType(0, true); 
          }
        }}
      >
        {avatar.ref && <CapsuleCollider args={[0.5, 0.2]} position={[0, 0.7, 0]} />}
      </RigidBody>
    </>
  );
};

export default Controls;
