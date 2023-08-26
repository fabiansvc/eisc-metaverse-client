import { MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";

const EISCFirstFloor = (props) => {
  const { nodes, materials } = useGLTF("/models/EISCFirstFloor.glb");

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={0}
        friction={1}
        >
          {/* Floor */}
          <mesh
            name="FirstFloor"
            geometry={nodes.FirstFloor.geometry}
            material={materials.floor}
          />
        </RigidBody>

        <RigidBody
          colliders="trimesh"
          type="fixed"
        >
          {/* WallsFirstFloor */}
          <group name="WallsFirstFloor">
            <mesh
              name="WallsFirstFloor_1"
              geometry={nodes.WallsFirstFloor_1.geometry}
              material={materials.wall}
            />
            <mesh
              name="WallsFirstFloor_2"
              geometry={nodes.WallsFirstFloor_2.geometry}
              material={materials.rack}
            />
            <mesh
              name="WallsFirstFloor_3"
              geometry={nodes.WallsFirstFloor_3.geometry}
              material={materials.alu}
            />
            <mesh
              name="WallsFirstFloor_4"
              geometry={nodes.WallsFirstFloor_4.geometry}
            >
              <MeshReflectorMaterial />
            </mesh>
            <mesh
              name="WallsFirstFloor_5"
              geometry={nodes.WallsFirstFloor_5.geometry}
              material={materials.brown}
            />
          </group>
        </RigidBody>
        <RigidBody colliders="cuboid" type="fixed">
          {/* Chairs */}
          <group name="ChairsA1">
            <mesh
              name="ChairsA1_1"
              geometry={nodes.ChairsA1_1.geometry}
              material={materials.grayChair}
            />
            <mesh
              name="ChairsA1_2"
              geometry={nodes.ChairsA1_2.geometry}
              material={materials.blackChair}
            />
          </group>
          {/* Doors */}
          <group name="DoorA1L">
            <mesh
              name="DoorA1L_1"
              geometry={nodes.DoorA1L_1.geometry}
              material={materials.alu}
            />
            <mesh
              name="DoorA1L_2"
              geometry={nodes.DoorA1L_2.geometry}
            >
              <MeshReflectorMaterial />
            </mesh>
          </group>
          <group name="DoorA1R">
            <mesh
              name="DoorA1R_1"
              geometry={nodes.DoorA1R_1.geometry}
              material={materials.alu}
            />
            <mesh
              name="DoorA1R_2"
              geometry={nodes.DoorA1R_2.geometry}

            >
              <MeshReflectorMaterial />
            </mesh>
          </group>
          <group name="DoorA2R">
            <mesh
              name="DoorA2R_1"
              geometry={nodes.DoorA2R_1.geometry}
              material={materials.alu}
            />
            <mesh
              name="DoorA2R_2"
              geometry={nodes.DoorA2R_2.geometry}
            >
              <MeshReflectorMaterial />
            </mesh>
          </group>
          <group name="DoorA2L">
            <mesh
              name="DoorA2R002"
              geometry={nodes.DoorA2R002.geometry}
              material={materials.alu}
            />
            <mesh
              name="DoorA2R002_1"
              geometry={nodes.DoorA2R002_1.geometry}
            >
              <MeshReflectorMaterial />
            </mesh>
          </group>
          <group name="DooAdminOffices">
            <mesh
              name="DoorAdminOffices"
              geometry={nodes.DoorAdminOffices.geometry}
              material={materials.alu}
            />
            <mesh
              name="DoorAdminOffices_1"
              geometry={nodes.DoorAdminOffices_1.geometry}
            >
              <MeshReflectorMaterial />
            </mesh>
          </group>
        </RigidBody>
        <RigidBody colliders="hull" type="fixed" restitution={0} friction={0}>
          {/* Desks */}
          <mesh
            name="DesksA2"
            geometry={nodes.DesksA2.geometry}
            material={materials.desk}
          />
          <mesh
            name="OfficeDeskPAIS"
            geometry={nodes.OfficeDeskPAIS.geometry}
            material={materials.desk}
          />
          <mesh
            name="OfficeDeskPosgrades"
            geometry={nodes.OfficeDeskPosgrades.geometry}
            material={materials.desk}
          />
          <mesh
            name="OfficeDeskTedesoft"
            geometry={nodes.OfficeDeskTedesoft.geometry}
            material={materials.desk}
          />
          <mesh
            name="OfficeDeskEISC"
            geometry={nodes.OfficeDeskEISC.geometry}
            material={materials.desk}
          />
          <mesh
            name="OfficeDeskMonitorsR"
            geometry={nodes.OfficeDeskMonitorsR.geometry}
            material={materials.desk}
          />
          <mesh
            name="OfficeDeskMonitorsL"
            geometry={nodes.OfficeDeskMonitorsL.geometry}
            material={materials.desk}
          />
          <mesh
            name="OfficeDeskSecretaryEISC"
            geometry={nodes.OfficeDeskSecretaryEISC.geometry}
            material={materials.desk}
          />
          <mesh
            name="OfficeDeskSecretaryPOS"
            geometry={nodes.OfficeDeskSecretaryPOS.geometry}
            material={materials.desk}
          />
          <mesh
            name="OfficeDeskReception"
            geometry={nodes.OfficeDeskReception.geometry}
            material={materials.desk}
          />
        </RigidBody>
        {/* Top First Floor */}
        <mesh
          name="TopFirstFloor"
          geometry={nodes.TopFirstFloor.geometry}
          material={materials.wall}
        />
        {/* Whiteboards */}
        <group name="WhiteboardA1">
          <mesh
            name="WhiteboardA1_1"
            geometry={nodes.WhiteboardA1_1.geometry}
            material={materials.mark}
          />
          <mesh
            name="WhiteboardA1_2"
            geometry={nodes.WhiteboardA1_2.geometry}
            material={materials.board}
          />
        </group>
        <group name="WhiteboardA2">
          <mesh
            name="WhiteboardA2_1"
            geometry={nodes.WhiteboardA2_1.geometry}
            material={materials.mark}
          />
          <mesh
            name="WhiteboardA2_2"
            geometry={nodes.WhiteboardA2_2.geometry}
            material={materials.board}
          />
        </group>
      </group>
    </group>
  );
};
export default EISCFirstFloor;

useGLTF.preload("/models/EISCFirstFloor.glb");
