import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const EISC = (props) => {
  const { nodes, materials } = useGLTF("/models/EISCModel.glb");

  return (
    <group {...props} dispose={null}>
      {/* Top First Floor */}
      <mesh geometry={nodes.TopFirstFloor.geometry} material={materials.wall} />
      <RigidBody colliders="cuboid" type="fixed" restitution={0} friction={0}>
        {/* Floor */}
        <mesh
          receiveShadow
          geometry={nodes.Floor.geometry}
          material={materials.floor}
        />
        {/* Desks */}
        <mesh
          geometry={nodes.DeskRight5.geometry}
          material={materials.MaterialDesk}
        />
        <mesh
          geometry={nodes.DeskLeft2.geometry}
          material={materials.MaterialDesk}
        />
        <mesh
          geometry={nodes.DeskLeft1.geometry}
          material={materials.MaterialDesk}
        />
        <mesh
          geometry={nodes.DeskRight1.geometry}
          material={materials.MaterialDesk}
        />
        <mesh
          geometry={nodes.DeskRight2.geometry}
          material={materials.MaterialDesk}
        />
        <mesh
          geometry={nodes.DeskRight4.geometry}
          material={materials.MaterialDesk}
        />
        <mesh
          geometry={nodes.DeskRight3.geometry}
          material={materials.MaterialDesk}
        />
        <mesh
          geometry={nodes.DeskRight6.geometry}
          material={materials.MaterialDesk}
        />
        <mesh
          geometry={nodes.DeskRight7.geometry}
          material={materials.MaterialDesk}
        />
        {/* Chairs */}
        <mesh
          geometry={nodes.Chair1_1.geometry}
          material={materials.MaterialChairBlack}
        />
        <mesh
          geometry={nodes.Chair1_2.geometry}
          material={materials.MaterialChairRed}
        />
        <mesh
          geometry={nodes.Chair7_1.geometry}
          material={materials.MaterialChairBlack}
        />
        <mesh
          geometry={nodes.Chair7_2.geometry}
          material={materials.MaterialChairRed}
        />
        <mesh
          geometry={nodes.Chair6_1.geometry}
          material={materials.MaterialChairBlack}
        />
        <mesh
          geometry={nodes.Chair6_2.geometry}
          material={materials.MaterialChairRed}
        />
        <mesh
          geometry={nodes.Chair3_1.geometry}
          material={materials.MaterialChairBlack}
        />
        <mesh
          geometry={nodes.Chair3_2.geometry}
          material={materials.MaterialChairRed}
        />
        <mesh
          geometry={nodes.Chair2_1.geometry}
          material={materials.MaterialChairBlack}
        />
        <mesh
          geometry={nodes.Chair2_2.geometry}
          material={materials.MaterialChairRed}
        />
        <mesh
          geometry={nodes.Chair5_1.geometry}
          material={materials.MaterialChairBlack}
        />
        <mesh
          geometry={nodes.Chair5_2.geometry}
          material={materials.MaterialChairRed}
        />
        <mesh
          geometry={nodes.Chair4_1.geometry}
          material={materials.MaterialChairBlack}
        />
        <mesh
          geometry={nodes.Chair4_2.geometry}
          material={materials.MaterialChairRed}
        />
        <mesh
          geometry={nodes.Chair8_1.geometry}
          material={materials.MaterialChairBlack}
        />
        <mesh
          geometry={nodes.Chair8_2.geometry}
          material={materials.MaterialChairRed}
        />
        <mesh
          geometry={nodes.Chair9_1.geometry}
          material={materials.MaterialChairBlack}
        />
        <mesh
          geometry={nodes.Chair9_2.geometry}
          material={materials.MaterialChairRed}
        />
      </RigidBody>
      {/* Wall */}
      <RigidBody
        colliders="trimesh"
        type="fixed"
        restitution={0.2}
        friction={1}
      >
        <mesh geometry={nodes.Wall_1.geometry} material={materials.wall} />
        <mesh geometry={nodes.Wall_2.geometry} material={materials.rack} />
      </RigidBody>
    </group>
  );
};
export default EISC;

useGLTF.preload("/models/EISCModel.glb");
