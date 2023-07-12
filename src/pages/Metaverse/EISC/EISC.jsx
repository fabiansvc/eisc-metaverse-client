import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const EISC = (props) => {
    const { nodes, materials } = useGLTF("/models/EISCModel.glb");

    return (
        <RigidBody colliders="trimesh" type='fixed'>
            <group {...props}>
                <mesh
                    geometry={nodes.FirstFloor.geometry}
                    material={materials.Material}
                />
            </group>
        </RigidBody>
    );
}
export default EISC;

useGLTF.preload("/models/EISCModel.glb");
