import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const EISC = (props) => {
    const { nodes, materials } = useGLTF("/models/EISCModel.glb");

    return (
        <RigidBody colliders="trimesh" type='fixed'>
            <group {...props} dispose={null}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.FirstFloor_1.geometry}
                    material={materials.wall}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.FirstFloor_2.geometry}
                    material={materials.rack}
                />
            </group>
        </RigidBody>
    );
}
export default EISC;

useGLTF.preload("/models/EISCModel.glb");
