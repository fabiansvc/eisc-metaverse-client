import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Stairs(props) {
    const { nodes, materials } = useGLTF("/models/Stairs.glb");
    return (
        <group {...props} dispose={null}>
            <RigidBody
                type="fixed"
                colliders="trimesh"
                restitution={0}
                friction={1}
            >
                <group>
                    <group>
                        <mesh geometry={nodes.Stairs_1.geometry} material={materials.glass} />
                        <mesh geometry={nodes.Stairs_2.geometry} material={materials.brown} />
                    </group>
                </group>
            </RigidBody>
        </group>
    );
}

useGLTF.preload("/models/Stairs.glb");
