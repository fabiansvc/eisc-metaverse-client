import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Stairs(props) {
    const { nodes, materials } = useGLTF("/assets/models/Stairs.glb");

    return (
        <group {...props} dispose={null}>
            <group>
                <RigidBody type="fixed" friction={0.7} restitution={0.01}>
                    <mesh
                        geometry={nodes.StairsBackFirstFloorBetween.geometry}
                        material={nodes.StairsBackFirstFloorBetween.material}
                    />
                </RigidBody>
                <RigidBody
                    type="fixed"
                    colliders={"hull"}
                    name="Stairs"
                    friction={0}
                    restitution={0.01}
                >
                    <mesh
                        geometry={nodes.StairsBackFirstFloorEntry.geometry}
                        material={nodes.StairsBackFirstFloorEntry.material}
                    />
                    <mesh
                        geometry={nodes.StairsBackFirstFloorOut.geometry}
                        material={nodes.StairsBackFirstFloorOut.material}
                    />
                </RigidBody>
            </group>

        </group>
    );
}
export default Stairs;
useGLTF.preload("/assets/models/Stairs.glb");
