import React from "react";
import { useGLTF } from "@react-three/drei";

export function Stairs(props) {
    const { nodes, materials } = useGLTF("/models/Stairs.glb");
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
                <group>
                    <mesh
                        geometry={nodes.StairsBack_1.geometry}
                        material={materials.wall}
                    />
                    <mesh
                        geometry={nodes.StairsBack_2.geometry}
                        material={materials.floor}
                    />
                </group>
            </group>
        </group>
    );
}
export default Stairs;
useGLTF.preload("/models/Stairs.glb");
