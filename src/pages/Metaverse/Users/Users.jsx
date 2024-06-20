import { Text, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { socketServer } from "../../../socket/socket-server";
import { RigidBody, quat, vec3 } from "@react-three/rapier";
import { Quaternion, Vector3 } from "three";

/**
 * User Component
 * @param {Object} props - Props for the User component
 * @param {Object} props.avatar - Avatar object containing avatar information
 * @returns {JSX.Element} User component
 */
const User = ({ avatar }) => {
  const userRef = useRef();
  const rigidBodyUserRef = useRef();

  const position = new Vector3(
    avatar.position.x,
    avatar.position.y,
    avatar.position.z
  );

  const rotation = new Quaternion(
    avatar.rotation[0],
    avatar.rotation[1],
    avatar.rotation[2],
    avatar.rotation[3]
  );

  let url = avatar?.avatarUrl;

  // Parameters for avatar loading
  const parametersAvatar = {
    quality: "medium", // low, medium, high
    meshLod: 1, // 0 - No triangle count reduction is applied (default), 1 - Retain 50% of the original triangle count, 2 - Retain 25% of the original triangle count.
    textureSizeLimit: 512, // Min: 256, Max: 1024 (default)
    useDracoMeshCompression: true,
  };

  // Constructing the URL with parameters
  url = `${url}?${Object.entries(parametersAvatar)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&")}`;

  // Load the GLTF model
  const { nodes, materials } = useGLTF(url);
  const height = nodes.Wolf3D_Avatar.geometry.boundingBox.max.y;
  const gender = height > 1.8 ? "male" : "female";

  // Load the animations based on gender
  const { animations } = useGLTF(
    gender === "male"
      ? "/assets/animations/manAnimations.glb"
      : "/assets/animations/womanAnimations.glb"
  );

  // Get animation actions
  const { actions } = useAnimations(animations, userRef);

  // Play the animation when the animation changes
  useEffect(() => {
    if (actions[avatar.animation]) {
      actions[avatar.animation].reset().fadeIn(0.5).play();
      return () => {
        if (actions[avatar.animation]) actions[avatar.animation].fadeOut(0.5);
      };
    }
  }, [avatar.animation]);

  useFrame(() => {
    if (!rigidBodyUserRef.current) return;
    rigidBodyUserRef.current.setTranslation(position, true);
    userRef.current.rotation.setFromQuaternion(rotation);
  });

  return (
    <RigidBody ref={rigidBodyUserRef} colliders={false}>
      <group ref={userRef} scale={0.9} dispose={null}>
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
        {/* Display user's nickname above the avatar */}
        <Text
          fontSize={0.05}
          color="black"
          position={[0, 1.9, 0]}
          textAlign="center"
        >
          {avatar.nickname}
        </Text>
      </group>
    </RigidBody>
  );
};

/**
 * Users Component
 * @returns {JSX.Element} Users component
 */

const Users = ({ avatars = null }) => {
  return avatars?.map(
    (avatar, index) =>
      socketServer?.id !== avatar?.id &&
      avatar?.avatarUrl !== "" && (
        <Suspense fallback={null}>
          <User key={index} avatar={avatar} />
        </Suspense>
      )
  );
};

export default Users;
