import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Stairs(props) {
    const { nodes, materials } = useGLTF("/assets/models/Stairs.glb");

    return (
        <group {...props} dispose={null}>
            <group>
                <RigidBody type="fixed" friction={0.7} restitution={0}>
                    {/* Stairs Back First Floor Between */}
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
                    restitution={0}
                >
                    {/* Stairs Back First Floor */}
                    <mesh
                        geometry={nodes.StairsBackFirstFloorEntry.geometry}
                        material={nodes.StairsBackFirstFloorEntry.material}
                    />
                    <mesh
                        geometry={nodes.StairsBackFirstFloorOut.geometry}
                        material={nodes.StairsBackFirstFloorOut.material}
                    />
                </RigidBody>
                <RigidBody type="fixed" friction={0.7} restitution={0}>
                    {/* Stairs Back Second Floor Between */}
                    <mesh
                        geometry={nodes.StairsBackSecondFloorBetween.geometry}
                        material={nodes.StairsBackSecondFloorBetween.material}
                    />
                </RigidBody>
                <RigidBody
                    type="fixed"
                    colliders={"hull"}
                    name="Stairs"
                    friction={0}
                    restitution={0}
                >
                    {/* Stairs Back Second Floor */}
                    <mesh
                        geometry={nodes.StairsBackSecondFloorEntry.geometry}
                        material={nodes.StairsBackSecondFloorEntry.material}
                    />
                    <mesh
                        geometry={nodes.StairsBackSecondFloorOut.geometry}
                        material={nodes.StairsBackSecondFloorOut.material}
                    />
                </RigidBody>
                <RigidBody
                    type="fixed"
                    colliders={"hull"}
                    name="Stairs"
                    friction={0}
                    restitution={0}
                >
                    {/* Stairs Second Third Floor */}
                    <mesh
                        geometry={nodes.StairsSecondThirdFloor.geometry}
                        material={materials.brown}
                    />
                </RigidBody>
            </group>
        </group>
    );
}
export default Stairs;
useGLTF.preload("/assets/models/Stairs.glb");
