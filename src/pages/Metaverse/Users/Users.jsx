import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

let url = "";

const Users = ({ avatar }) => {
    const avatarRef = useRef();
    url = avatar.avatarUrl;
    const parametersAvatar = {
        quality: "high", // low, medium, high
        meshLod: 0, // 0 - No triangle count reduction is applied (default), 1 - Retain 50% of the original triangle count, 2 - Retain 25% of the original triangle count.
        textureSizeLimit: 1024, // Min: 256, Max: 1024 (default)
        useDracoMeshCompression: true,
    };

    url = `${url}?${Object.entries(parametersAvatar)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&")}`;

    const { nodes, materials } = useGLTF(url);

    const gender =
        nodes.Wolf3D_Avatar.geometry.boundingBox.max.y > 1.8 ? "male" : "female";

    const { animations } = useGLTF(
        gender === "male"
            ? "/animations/menAnimations.glb"
            : "/animations/womanAnimations.glb"
    );
    const { actions } = useAnimations(animations, avatarRef);

    useEffect(() => {
        if (avatar.animation) {
            const action = actions[avatar.animation];
            action.reset().fadeIn(0.2).play();
            return () => {
                action.fadeOut(0.2);
            };
        }
    }, [avatar.animation]);

    useFrame(()=>{
        avatarRef.current.position.x = avatar.position[0]
        avatarRef.current.position.y = avatar.position[1]
        avatarRef.current.position.z = avatar.position[2]
        avatarRef.current.rotation.x = avatar.rotation._x
        avatarRef.current.rotation.y = avatar.rotation._y
        avatarRef.current.rotation.z = avatar.rotation._z
    })

    return (
        <group ref={avatarRef} scale={0.85} dispose={null}>
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
    );
}

export default Users;
useGLTF.preload(url);