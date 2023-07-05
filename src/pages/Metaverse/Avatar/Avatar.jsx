import { Center, useAnimations, useGLTF } from "@react-three/drei";
import "./stylesAvatar.css"
import { useEffect, useRef } from "react";

let avatarUrl = ""

const Avatar = ({ avatarUrl, position, rotation }) => {
    const avatarRef = useRef();
    avatarUrl = avatarUrl;

    // const parametersAvatar = {
    //     quality: "low",
    //     meshLod: 2,
    //     textureSizeLimit: 256,
    //     textureAtlas: "none",
    //     useDracoMeshCompression: false
    // }

    // parametersVisage = `${avatarUrl}?${Object.entries(parametersAvatar)
    //     .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    //     .join("&")}`;

    const { nodes, materials } = useGLTF(avatarUrl);
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
useGLTF.preload(avatarUrl);
