import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const EISCThirdFloor = (props) => {
    const { nodes, materials } = useGLTF("/assets/models/EISCThirdFloor.glb");
    return (
        <group {...props} dispose={null}>
            <group>
                {/* Third Floor */}
                <RigidBody type="fixed" colliders={"trimesh"} friction={0.7} restitution={0}>
                    <mesh
                        geometry={nodes.ThirdFloor.geometry}
                        material={materials.floor}
                    />
                </RigidBody>
                {/* Sctructure Third Floor */}
                <RigidBody
                    type="fixed"
                    colliders={"trimesh"}
                    name="EISCBody"
                    friction={0.7}
                    restitution={0}
                >
                    <group>
                        <mesh
                            geometry={nodes.StructureThirdFloor_1.geometry}
                            material={materials.wall}
                        />
                        <mesh
                            geometry={nodes.StructureThirdFloor_2.geometry}
                            material={materials.glass}
                        />
                        <mesh
                            geometry={nodes.StructureThirdFloor_3.geometry}
                            material={materials.rack}
                        />
                        <mesh
                            geometry={nodes.StructureThirdFloor_4.geometry}
                            material={materials.brown}
                        />
                    </group>
                </RigidBody>
                {/* Top Third Floor */}
                <mesh
                    geometry={nodes.TopThirdFloor.geometry}
                    material={materials.wall}
                />
            </group>
        </group>
    );
}

export default EISCThirdFloor;
useGLTF.preload("/assets/models/EISCThirdFloor.glb");