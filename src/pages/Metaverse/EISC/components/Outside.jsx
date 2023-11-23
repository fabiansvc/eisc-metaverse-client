import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

const Outside = (props) => {
    const { nodes, materials } = useGLTF("/assets/models/Outside.glb");
    return (
        <RigidBody type="fixed" colliders={"trimesh"}>
            <group {...props} dispose={null}>
                <group>
                    <mesh geometry={nodes.Outside.geometry} material={materials.Outside} />
                </group>
            </group>
            <CuboidCollider args={[27.75, 1, 0.1]} position={[-8.15, 1, 4.15]}/>
            <CuboidCollider args={[27.75, 1, 0.1]} position={[-8.15, 1, -23.5]}/>
            <CuboidCollider args={[0.1, 1, 13.85]} position={[-36, 1, -9.7]}/>
            <CuboidCollider args={[0.1, 1, 13.85]} position={[19.65, 1, -9.7]}/>
        </RigidBody>
    );
}
export default Outside;
useGLTF.preload("/assets/models/Outside.glb");
