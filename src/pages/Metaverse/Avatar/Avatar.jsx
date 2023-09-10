import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useUser } from "../../../context/UserContext";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useAvatar } from "../../../context/AvatarContext";

let url = "";

const Avatar = () => {
  const { user, setUser } = useUser();
  const { avatar, setAvatar } = useAvatar();
  const avatarRef = useRef();
  const avatarBodyRef = useRef();
  url = user.avatarUrl;

  const parametersAvatar = {
    quality: "high", // low, medium, high
    meshLod: 1, // 0 - No triangle count reduction is applied (default), 1 - Retain 50% of the original triangle count, 2 - Retain 25% of the original triangle count.
    textureSizeLimit: 1024, // Min: 256, Max: 1024 (default)
    useDracoMeshCompression: true,
  };

  url = `${url}?${Object.entries(parametersAvatar)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&")}`;

  const { nodes, materials } = useGLTF(url);
  const height = nodes.Wolf3D_Avatar.geometry.boundingBox.max.y;
  const gender = height > 1.8 ? "male" : "female";

  const { animations } = useGLTF(
    gender === "male"
      ? "/animations/menAnimations.glb"
      : "/animations/womanAnimations.glb"
  );
  const { actions } = useAnimations(animations, avatarRef);

  useEffect(() => {
    if (user.animation) {
      const action = actions[user.animation];
      action.reset().fadeIn(0.2).play();
      return () => {
        action.fadeOut(0.2);
      };
    }
  }, [user.animation]);

  useEffect(() => {
    if (avatarBodyRef.current) {
      setUser({
        ...user,
        gender: gender,
      });

      setAvatar({
        ...avatar,
        ref: avatarRef.current,
        body: avatarBodyRef.current,
      });
    }
  }, [avatarBodyRef.current]);


  return (
    <RigidBody
      ref={avatarBodyRef}
      colliders={false}
      position={[0, 1, 0]}
      restitution={0}
      friction={1}
    >
      <group ref={avatarRef} scale={0.85} rotation-y={-Math.PI} dispose={null}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          name="Wolf3D_Avatar"
          geometry={nodes.Wolf3D_Avatar.geometry}
          material={materials.Wolf3D_Avatar}
          skeleton={nodes.Wolf3D_Avatar.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences}
        />
        {nodes.Wolf3D_Avatar_Transparent && (
          <skinnedMesh
            geometry={nodes.Wolf3D_Avatar_Transparent.geometry}
            material={materials.Wolf3D_Avatar_Transparent}
            skeleton={nodes.Wolf3D_Avatar_Transparent.skeleton}
          />
        )}
      </group>
      <CuboidCollider position={[0, 0.4, 0]} args={[0.2, 0.4, 0.2]} />
    </RigidBody>
  );
};

export default Avatar;
useGLTF.preload(url);
