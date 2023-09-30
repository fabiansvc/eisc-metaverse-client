import React from "react";
import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export function Stairs(props) {
    const { nodes, materials } = useGLTF("/assets/models/Stairs.glb");
    return (
        <group {...props} dispose={null}>
            <group>
                <group>
                    <mesh
                        geometry={nodes.StairsSecondThirdFloor_1.geometry}
                        material={materials.glass}
                    />
                    <mesh
                        geometry={nodes.StairsSecondThirdFloor_2.geometry}
                        material={materials.brown}
                    />
                </group>
                <RigidBody
                    type="fixed"
                    colliders={"hull"}
                    name="Stairs"
                    friction={0}
                    restitution={0.01}
                >
                    <mesh
                        geometry={nodes.Stairs.geometry}
                        material={nodes.Stairs.material}
                    />
                </RigidBody>
            </group>
        </group>
    );
}
export default Stairs;
useGLTF.preload("/assets/models/Stairs.glb");
