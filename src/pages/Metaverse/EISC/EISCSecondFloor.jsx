import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const EISCSecondFloor = (props) => {
  const { nodes, materials } = useGLTF("/models/EISCSecondFloor.glb");

  return (
    <group {...props} dispose={null}>
      <RigidBody
        colliders="trimesh"
        type="fixed"
      >
        {/* SctructureSecondFloor */}
        <group>
          <mesh
            geometry={nodes.StructureSecondFloor_1.geometry}
            material={materials.wall}
          />
          <mesh
            geometry={nodes.StructureSecondFloor_2.geometry}
            material={materials.glass}
          />
        </group>


        {/* Doors */}

      </RigidBody>
      <RigidBody colliders="cuboid" type="fixed">
        {/* Chairs */}
      </RigidBody>
      <RigidBody colliders="hull" type="fixed" restitution={0} friction={0}>
        {/* Desks */}
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={0}
        friction={1}
      >
        {/* Floor */}
        <mesh
          geometry={nodes.SecondFloor.geometry}
          material={materials.floor}
        />
      </RigidBody>
      {/* Top Second Floor */}
      {/* Whiteboards */}
    </group>
  );
};
export default EISCSecondFloor;

useGLTF.preload("/models/EISCSecondFloor.glb");
