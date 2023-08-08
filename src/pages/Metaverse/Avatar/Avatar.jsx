import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useUser } from "../../../context/userContext";
import { RigidBody } from "@react-three/rapier";

let url = ""

const Avatar = () => {
    const { user, setUser } = useUser();
    const avatarRef = useRef();
    const avatarBodyRef = useRef();
    url = user.avatarUrl

    const parametersAvatar = {
        quality: "high", // low, medium, high
        meshLod: 0, // 0 - No triangle count reduction is applied (default), 1 - Retain 50% of the original triangle count, 2 - Retain 25% of the original triangle count.
        textureSizeLimit: 1024, // Min: 256, Max: 1024 (default)
        useDracoMeshCompression: true
    }

    url = `${url}?${Object.entries(parametersAvatar)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&")}`;

    const { nodes, materials } = useGLTF(url);
    const gender = nodes.Wolf3D_Avatar.geometry.boundingBox.max.y > 1.80 ? "male" : "female"
    const { animations } = useGLTF((gender === "male") ? "/animations/menAnimations.glb" : "/animations/womanAnimations.glb");
    const { actions } = useAnimations(animations, avatarRef);
    
    useEffect(() => {
        const action = actions[user.animation]
        action
            .reset()
            .fadeIn(0.2)
            .play()
        return () => {
            action.fadeOut(0.2)
        }
    }, [user.animation])

    useEffect(() => {
        if (avatarBodyRef.current) {
            setUser({
                ...user,
                ref: avatarRef.current,
                body: avatarBodyRef.current,
                gender: gender
            })
        }
    }, [avatarBodyRef.current])

    return <>
        <RigidBody
            ref={avatarBodyRef}
            colliders="cuboid"
            restitution={0.01}
            friction={1}
            mass={1}
        >
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
        </RigidBody>
    </>
}

export default Avatar;
useGLTF.preload(url);
