import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../../context/SocketContex";
import { useFrame } from "@react-three/fiber";

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
    const height = nodes.Wolf3D_Avatar.geometry.boundingBox.max.y;
    const gender = height > 1.8 ? "male" : "female";

    const { animations } = useGLTF(
        gender === "male"
            ? "/assets/animations/manAnimations.glb"
            : "/assets/animations/womanAnimations.glb"
    );

    const { actions } = useAnimations(animations, avatarRef);

    useFrame(() => {
        avatarRef.current.position.x = avatar.position[0];
        avatarRef.current.position.y = avatar.position[1];
        avatarRef.current.position.z = avatar.position[2];
        avatarRef.current.rotation.x = avatar.rotation[0];
        avatarRef.current.rotation.y = avatar.rotation[1];
        avatarRef.current.rotation.z = avatar.rotation[2];
    },)

    useEffect(() => {
        const action = actions[avatar.animation];
        action.reset().fadeIn(0.2).play();

        return () => {
            action.fadeOut(0.2);
        }
    }, [avatar.animation]);

    return (
        <group ref={avatarRef} position-y={0} scale={0.8} rotation-y={-Math.PI} dispose={null}>
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
        </group >
    );
}

export default Users;

useGLTF.preload(url);