import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function EISCThirdFloor(props) {
    const { nodes, materials } = useGLTF("/assets/models/EISCThirdFloor.glb");
    return (
        <RigidBody type="fixed" colliders={"trimesh"} friction={0.7} restitution={0}>
            <group {...props} dispose={null}>
                <mesh
                    geometry={nodes.FloorThirdFloor.geometry}
                    material={materials.floor}
                />
            </group>
        </RigidBody>
    );
}

export default EISCThirdFloor;
useGLTF.preload("/assets/models/EISCThirdFloor.glb");