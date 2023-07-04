import { Center, useAnimations, useGLTF } from "@react-three/drei";
import "./stylesAvatar.css"
import { useEffect, useRef } from "react";

let avatarUrl = ""

const Avatar = ({avatarUrl, type, position, rotation}) => {
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
    const { animations } = useGLTF((type == "men") ? "/animations/menAnimations.glb" : "/animations/womanAnimations.glb");
    const { actions } = useAnimations(animations, avatarRef);

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
                <skinnedMesh
                    geometry={nodes.Wolf3D_Avatar_Transparent.geometry}
                    material={materials.Wolf3D_Avatar_Transparent}
                    skeleton={nodes.Wolf3D_Avatar_Transparent.skeleton}
                />
            </group>
        </Center>
    </>
}

export default Avatar;
useGLTF.preload(avatarUrl);
