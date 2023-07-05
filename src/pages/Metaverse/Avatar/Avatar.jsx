import { Center, useAnimations, useGLTF } from "@react-three/drei";
import "./stylesAvatar.css"
import { useEffect, useRef } from "react";

let url = ""

const Avatar = ({ avatarUrl, position, rotation }) => {
    const avatarRef = useRef();
    url = avatarUrl
    
    const parametersAvatar = {
        quality: "high", // low, medium, high
        meshLod: 0, // 0 - No triangle count reduction is applied (default), 1 - Retain 50% of the original triangle count, 2 - Retain 25% of the original triangle count.
        textureSizeLimit: 1024, // Min: 256, Max: 1024 (default)
        useDracoMeshCompression: false
    }

    url = `${url}?${Object.entries(parametersAvatar)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&")}`;

    const { nodes, materials } = useGLTF(url);
    const type = nodes.Wolf3D_Avatar.geometry.boundingBox.max.y < 1.85? "woman": "man"
    const { animations } = useGLTF((type == "man") ? "/animations/menAnimations.glb" : "/animations/womanAnimations.glb");
    const { actions } = useAnimations(animations, avatarRef);

    console.log(nodes);

    useEffect(() => {
        const action = actions.Idle
        action.play()
    }, [])

    return <>
        <Center>
            <group ref={avatarRef} position={position} rotation={rotation}>
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
        </Center>
    </>
}

export default Avatar;
useGLTF.preload(url);
