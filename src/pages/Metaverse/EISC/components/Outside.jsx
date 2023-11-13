import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Outside = (props) => {
    const { nodes, materials } = useGLTF("/assets/models/Outside.glb");
    return (
        <RigidBody type="fixed" colliders={"trimesh"} friction={0.7} restitution={0}>
            <group {...props} dispose={null}>
                <group>
                    <mesh geometry={nodes.Outside.geometry} material={materials.Outside} />
                </group>
            </group>
        </RigidBody>

    );
}
export default Outside;
useGLTF.preload("/assets/models/Outside.glb");
