import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Stairs = (props) => {
    const { nodes, materials } = useGLTF("/assets/models/Stairs.glb");

    return (
        <group {...props} dispose={null}>
            <group>
                <RigidBody type="fixed">
                    <mesh
                        geometry={nodes.StairsFrontFirstFloorBetween.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsFrontSecondFloorBetween.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsFrontThirdFloorBetween.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsFrontFourthFloorBetween.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsBackFirstFloorBetween.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsBackSecondFloorBetween.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsBackThirdFloorBetween.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsBackFourthFloorBetween.geometry}
                        material={materials.floor}
                    />
                </RigidBody>
                <RigidBody
                    type="fixed"
                    colliders={"hull"}
                    name="Stairs"
                    friction={0}
                    restitution={0}
                >
                    <mesh
                        geometry={nodes.StairsMiddle.geometry}
                        material={materials.brown}
                    />
                    <mesh
                        geometry={nodes.StairsFrontFirstFloorEntry.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsFrontFirstFloorOut.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsFrontSecondFloorEntry.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsFrontSecondFloorOut.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsFrontThirdFloorEntry.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsFrontThirdFloorOut.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsFrontFourthFloorEntry.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsFrontFourthFloorOut.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsBackFirstFloorEntry.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsBackFirstFloorOut.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsBackSecondFloorEntry.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsBackSecondFloorOut.geometry}
                        material={materials.floor}
                    />

                    <mesh
                        geometry={nodes.StairsBackThirdFloorEntry.geometry}
                        material={materials.floor}
                    />

                    <mesh
                        geometry={nodes.StairsBackThirdFloorOut.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsBackFourthFloorEntry.geometry}
                        material={materials.floor}
                    />
                    <mesh
                        geometry={nodes.StairsBackFourthFloorOut.geometry}
                        material={materials.floor}
                    />
                </RigidBody>
            </group>
        </group>
    );
}
export default Stairs;
useGLTF.preload("/assets/models/Stairs.glb");
