import { useGLTF } from "@react-three/drei";

export function Outside(props) {
    const { nodes, materials } = useGLTF("/assets/models/Outside.glb");
    return (
        <group {...props} dispose={null} position-y={-0.01}>
            <group>
                <mesh geometry={nodes.Outside.geometry} material={materials.hallway} />
            </group>
        </group>
    );
}
export default Outside;
useGLTF.preload("/assets/models/Outside.glb");