import { Text, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { useRef } from "react";
import { Vector3 } from "three";
import { avatarsAtom, socket } from "../../../components/Socket/SocketManager";

const User = ({ avatar }) => {
    const avatarRef = useRef();
    const position = new Vector3(avatar.position.x, avatar.position.y, avatar.position.z);
    const rotation = new Vector3(avatar.rotation._x, avatar.rotation._y, avatar.rotation._z);
    let url = avatar?.avatarUrl;

    const parametersAvatar = {
        quality: "medium", // low, medium, high
        meshLod: 1, // 0 - No triangle count reduction is applied (default), 1 - Retain 50% of the original triangle count, 2 - Retain 25% of the original triangle count.
        textureSizeLimit: 512, // Min: 256, Max: 1024 (default)
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
        if (actions[avatar.animation]) {
            actions[avatar.animation].reset().fadeIn(0.5).play();
            return () => {
                if (actions[avatar.animation])
                    actions[avatar.animation].fadeOut(0.5);
            }
        }
    }, [avatar.animation, actions]);

    useFrame(() => {
        if (avatarRef.current) {
            avatarRef.current.position.set(position.x, position.y, position.z);
            avatarRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
        }
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
            <Text fontSize={0.05} color="black" position={[0, 1.9, 0]} textAlign="center">
                {avatar.nickname}
            </Text>
        </group >
    );
}

const Users = () => {
    const [avatars] = useAtom(avatarsAtom);
    return (
        <>
            {avatars.map((avatar, index) => (
                (socket?.id !== avatar?.id && avatar?.avatarUrl !== "") ?
                    <Suspense fallback={null} key={index}>
                        <User key={index} avatar={avatar} />
                    </Suspense>
                    : null
            ))}
        </>
    );
}

export default Users;
