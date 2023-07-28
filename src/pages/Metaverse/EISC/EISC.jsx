import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const EISC = (props) => {
    const { nodes, materials } = useGLTF("/models/EISCModel.glb");

    return (
        <group {...props} dispose={null}>
            {/* Top First Floor */}
            <mesh
                geometry={nodes.TopFirstFloor.geometry}
                material={materials.wall}
            />
            {/* Racks */}
            <mesh
                geometry={nodes.Racks.geometry}
                material={materials.rack}
            />
            {/* Floor */}
            <RigidBody colliders="cuboid" type='fixed'>
                <mesh
                    receiveShadow
                    geometry={nodes.Floor.geometry}
                    material={materials.floor}
                />
            </RigidBody>
            {/* Chairs */}
            <RigidBody colliders="cuboid" type='fixed'>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh
                        castShadow
                        geometry={nodes.Chair1_1.geometry}
                        material={materials.MaterialChairBlack}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair1_2.geometry}
                        material={materials.MaterialChairRed}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair2_1.geometry}
                        material={materials.MaterialChairBlack}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair2_2.geometry}
                        material={materials.MaterialChairRed}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair3_1.geometry}
                        material={materials.MaterialChairBlack}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair3_2.geometry}
                        material={materials.MaterialChairRed}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair4_1.geometry}
                        material={materials.MaterialChairBlack}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair4_2.geometry}
                        material={materials.MaterialChairRed}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair5_1.geometry}
                        material={materials.MaterialChairBlack}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair5_2.geometry}
                        material={materials.MaterialChairRed}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair6_1.geometry}
                        material={materials.MaterialChairBlack}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair6_2.geometry}
                        material={materials.MaterialChairRed}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair7_1.geometry}
                        material={materials.MaterialChairBlack}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair7_2.geometry}
                        material={materials.MaterialChairRed}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair8_1.geometry}
                        material={materials.MaterialChairBlack}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair8_2.geometry}
                        material={materials.MaterialChairRed}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair9_1.geometry}
                        material={materials.MaterialChairBlack}
                    />
                    <mesh
                        castShadow
                        geometry={nodes.Chair9_2.geometry}
                        material={materials.MaterialChairRed}
                    />
                </group>
            </RigidBody>
            {/* Wall */}
            <RigidBody colliders="trimesh" type='fixed'>
                <mesh
                    geometry={nodes.Wall.geometry}
                    material={materials.wall}
                />
            </RigidBody>
        </group>
    );
}
export default EISC;

useGLTF.preload("/models/EISCModel.glb");
