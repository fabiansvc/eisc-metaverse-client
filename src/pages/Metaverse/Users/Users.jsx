import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { useRef } from "react";
import { Vector3 } from "three";

let url = ""
const Users = ({ avatar }) => {
    const avatarRef = useRef();
    const position = new Vector3(avatar.position.x, avatar.position.y, avatar.position.z);
    const rotation = new Vector3(avatar.rotation._x, avatar.rotation._y, avatar.rotation._z);
    url = avatar.url;

    const parametersAvatar = {
        quality: "high", // low, medium, high
        meshLod: 0, // 0 - No triangle count reduction is applied (default), 1 - Retain 50% of the original triangle count, 2 - Retain 25% of the original triangle count.
        textureSizeLimit: 1024, // Min: 256, Max: 1024 (default)
        useDracoMeshCompression: true,
    };

    url = `${url}?${Object.entries(parametersAvatar)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&")}`

    const { nodes, materials } = useGLTF(url);
    const height = nodes.Wolf3D_Avatar.geometry.boundingBox.max.y;
    const gender = height > 1.8 ? "male" : "female";

    const { animations } = useGLTF(
        gender === "male"
            ? "/assets/animations/manAnimations.glb"
            : "/assets/animations/womanAnimations.glb"
    );

    const { actions } = useAnimations(animations, avatarRef);

    useEffect(() => {
        if(actions[avatar.animation]){
            actions[avatar.animation].reset().fadeIn(0.5).play();
            return () => {
                if(actions[avatar.animation])
                    actions[avatar.animation].fadeOut(0.5);
            }
        }
    }, [avatar.animation]);

    useFrame(() => {
        avatarRef.current?.position.set(position.x, position.y, position.z);
        avatarRef.current?.rotation.set(rotation.x, rotation.y, rotation.z);
    })

    return (
        <group ref={avatarRef} scale={0.9} dispose={null}>
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

useGLTF.preload(url)