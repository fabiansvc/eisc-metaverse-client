import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const EISCFirstFloor = (props) => {
  const { nodes, materials } = useGLTF("/models/EISCFirstFloor.glb");

  return (
    <group {...props} dispose={null}>
      {/* WallsFirstFloor */}
      <RigidBody
        colliders="trimesh"
        type="fixed"
        restitution={0}
        friction={0}
      >
        <group>
          <mesh
            geometry={nodes.WallsFirstFloor_1.geometry}
            material={materials.wall}
          />
          <mesh
            geometry={nodes.WallsFirstFloor_2.geometry}
            material={materials.rack}
          />
          <mesh
            geometry={nodes.WallsFirstFloor_3.geometry}
            material={materials.alu}
          />
          <mesh
            geometry={nodes.WallsFirstFloor_4.geometry}
            material={materials.brown}
          />
        </group>
      </RigidBody>
      <RigidBody colliders="cuboid" type="fixed" restitution={0} friction={0}>
        {/* Floor */}
        <mesh geometry={nodes.FirstFloor.geometry} material={materials.floor} />
        {/* Chairs */}
        <group>
          <mesh
            geometry={nodes.ChairsA1_1.geometry}
            material={materials.grayChair}
          />
          <mesh
            geometry={nodes.ChairsA1_2.geometry}
            material={materials.blackChair}
          />
        </group>
         {/* Doors */}
        <group>
          <mesh geometry={nodes.DoorA2_1.geometry} material={materials.alu} />
          <mesh geometry={nodes.DoorA2_2.geometry}>
            <MeshTransmissionMaterial/>
          </mesh>
        </group>
      </RigidBody>
      <RigidBody colliders="hull" type="fixed" restitution={0} friction={0}>
        {/* Desks */}
        <mesh
          geometry={nodes.OfficeDeskPAIS.geometry}
          material={materials.desk}
          position={[-3.9, 0, 0]}
        />
        <mesh
          geometry={nodes.OfficeDeskPosgrades.geometry}
          material={materials.desk}
        />
        <mesh
          geometry={nodes.OfficeDeskTedesoft.geometry}
          material={materials.desk}
          position={[-3.9, 0, 0]}
        />
        <mesh
          geometry={nodes.OfficeDeskEISC.geometry}
          material={materials.desk}
          position={[-9.9, 0, 0]}
        />
        <mesh
          geometry={nodes.OfficeDeskMonitorsR.geometry}
          material={materials.desk}
          position={[-9.9, 0, 0]}
        />
        <mesh
          geometry={nodes.OfficeDeskMonitorsL.geometry}
          material={materials.desk}
          position={[-9.9, 0, 0]}
        />
        <mesh
          geometry={nodes.OfficeDeskSecretaryEISC.geometry}
          material={materials.desk}
          position={[-7.7, 0, 0]}
        />
        <mesh
          geometry={nodes.OfficeDeskSecretaryPOS.geometry}
          material={materials.desk}
          position={[-3.9, 0, 0]}
        />
        <mesh
          geometry={nodes.OfficeDeskReception.geometry}
          material={materials.desk}
        />
      </RigidBody>
      {/* Whiteboards */}
      <group>
        <mesh
          geometry={nodes.WhiteboardA1_1.geometry}
          material={materials.mark}
        />
        <mesh
          geometry={nodes.WhiteboardA1_2.geometry}
          material={materials.board}
        />
      </group>
      {/* Top First Floor */}
      <mesh
        geometry={nodes.TopFirstFloor.geometry}
        material={materials.wall}
      />
    </group>
  );
};
export default EISCFirstFloor;

useGLTF.preload("/models/EISCFirstFloor.glb");
