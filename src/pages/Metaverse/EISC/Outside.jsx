import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Outside(props) {
    const { nodes, materials } = useGLTF("/models/Outside.glb");
    return (
        <group {...props} dispose={null}>
            <RigidBody
                type="fixed"
                colliders="cuboid"
                restitution={0}
                friction={1}
            >
                <group>
                    <mesh geometry={nodes.Outside.geometry} material={materials.hallway} />
                </group>
            </RigidBody>
        </group>
    );
}
export default Outside;
useGLTF.preload("/models/Outside.glb");
