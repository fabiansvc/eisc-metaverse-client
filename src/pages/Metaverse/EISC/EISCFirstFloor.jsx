import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const EISCFirstFloor = (props) => {
  const { nodes, materials } = useGLTF("/models/EISCFirstFloor.glb");

  return (
    <group {...props} dispose={null}>
        <RigidBody
          colliders="trimesh"
          type="fixed"
        >
          {/* SctructureFirstFloor */}
          <group>
            <mesh
              geometry={nodes.StructureFirstFloor_1.geometry}
              material={materials.wall}
            />
            <mesh
              geometry={nodes.StructureFirstFloor_2.geometry}
              material={materials.rack}
            />
            <mesh
              geometry={nodes.StructureFirstFloor_3.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.StructureFirstFloor_4.geometry}
              material={materials.brown}
            />
            <mesh
              geometry={nodes.StructureFirstFloor_5.geometry}
              material={materials.blueGlass}
            />
            <mesh
              geometry={nodes.StructureFirstFloor_6.geometry}
              material={materials.glass}
            />
          </group>
          {/* Doors */}
          <group>
            <mesh geometry={nodes.DoorA1L_1.geometry} material={materials.rack} />
            <mesh geometry={nodes.DoorA1L_2.geometry} material={materials.alu} />
            <mesh
              geometry={nodes.DoorA1L_3.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh geometry={nodes.DoorA1R_1.geometry} material={materials.rack} />
            <mesh geometry={nodes.DoorA1R_2.geometry} material={materials.alu} />
            <mesh
              geometry={nodes.DoorA1R_3.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh geometry={nodes.DoorA2L_1.geometry} material={materials.rack} />
            <mesh geometry={nodes.DoorA2L_2.geometry} material={materials.alu} />
            <mesh
              geometry={nodes.DoorA2L_3.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh geometry={nodes.DoorA2R_1.geometry} material={materials.rack} />
            <mesh geometry={nodes.DoorA2R_2.geometry} material={materials.alu} />
            <mesh
              geometry={nodes.DoorA2R_3.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh geometry={nodes.DoorAO_1.geometry} material={materials.rack} />
            <mesh geometry={nodes.DoorAO_2.geometry} material={materials.alu} />
            <mesh geometry={nodes.DoorAO_3.geometry} material={materials.glass} />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorDirectionPAIS_1.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorDirectionPAIS_2.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorDirectionPosgrades_1.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorDirectionPosgrades_2.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorTedesoft_1.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorTedesoft_2.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorDirectionEISC_1.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorDirectionEISC_2.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorMonitors_1.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorMonitors_2.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorSecretaryDirectionEISC_1.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorSecretaryDirectionEISC_2.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorSecretaryEISC_1.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorSecretaryEISC_2.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorReception_1.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorReception_2.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh geometry={nodes.DoorA3_1.geometry} material={materials.rack} />
            <mesh geometry={nodes.DoorA3_2.geometry} material={materials.alu} />
            <mesh geometry={nodes.DoorA3_3.geometry} material={materials.glass} />
          </group>
          <group>
            <mesh geometry={nodes.DoorA4R_1.geometry} material={materials.rack} />
            <mesh geometry={nodes.DoorA4R_2.geometry} material={materials.alu} />
            <mesh
              geometry={nodes.DoorA4R_3.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh geometry={nodes.DoorA4L_1.geometry} material={materials.rack} />
            <mesh geometry={nodes.DoorA4L_2.geometry} material={materials.alu} />
            <mesh
              geometry={nodes.DoorA4L_3.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorBack1_1.geometry}
              material={materials.rack}
            />
            <mesh
              geometry={nodes.DoorBack1_2.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorBack1_3.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorEntry1_1.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorEntry1_2.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorEntry2_1.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorEntry2_2.geometry}
              material={materials.glass}
            />
          </group>
          <group>
            <mesh
              geometry={nodes.DoorBack2_1.geometry}
              material={materials.rack}
            />
            <mesh
              geometry={nodes.DoorBack2_2.geometry}
              material={materials.alu}
            />
            <mesh
              geometry={nodes.DoorBack2_3.geometry}
              material={materials.glass}
            />
          </group>
        </RigidBody>
        <RigidBody colliders="cuboid" type="fixed">
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
          <group>
            <mesh
              geometry={nodes.ChairsA3_1.geometry}
              material={materials.grayChair}
            />
            <mesh
              geometry={nodes.ChairsA3_2.geometry}
              material={materials.blackChair}
            />
          </group>

        </RigidBody>
        <RigidBody colliders="hull" type="fixed" restitution={0} friction={0}>
          {/* Desks */}
          <mesh geometry={nodes.DesksA2.geometry} material={materials.desk} />
          <mesh
            geometry={nodes.DeskDirectionPAIS.geometry}
            material={materials.desk}
          />
          <mesh
            geometry={nodes.DeskDirectionPosgrades.geometry}
            material={materials.desk}
          />
          <mesh
            geometry={nodes.DeskDirectionTedesoft.geometry}
            material={materials.desk}
          />
          <mesh
            geometry={nodes.DeskDirectionEISC.geometry}
            material={materials.desk}
          />
          <mesh
            geometry={nodes.DeskMonitors1.geometry}
            material={materials.desk}
          />
          <mesh
            geometry={nodes.DeskMonitors2.geometry}
            material={materials.desk}
          />
          <mesh
            geometry={nodes.DeskSecretaryDirectionEISC.geometry}
            material={materials.desk}
          />
          <mesh
            geometry={nodes.DeskSecretaryEISC.geometry}
            material={materials.desk}
          />
          <mesh
            geometry={nodes.DeskSecretaryReception.geometry}
            material={materials.desk}
          />
        </RigidBody>
        <RigidBody
          type="fixed"
          colliders="cuboid"
          restitution={0}
          friction={1}
        >
          {/* Floor */}
          <mesh geometry={nodes.FirstFloor.geometry} material={materials.floor} />
        </RigidBody>
        {/* Top First Floor */}
        <mesh
          geometry={nodes.TopFirstFloor.geometry}
          material={materials.wall}
        />
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
        <group>
          <mesh
            geometry={nodes.WhiteboardA2_1.geometry}
            material={materials.mark}
          />
          <mesh
            geometry={nodes.WhiteboardA2_2.geometry}
            material={materials.board}
          />
        </group>
        <group>
          <mesh
            geometry={nodes.WhiteboardA3_1.geometry}
            material={materials.mark}
          />
          <mesh
            geometry={nodes.WhiteboardA3_2.geometry}
            material={materials.board}
          />
        </group>
        <group>
          <mesh
            geometry={nodes.WhiteboardA4_1.geometry}
            material={materials.mark}
          />
          <mesh
            geometry={nodes.WhiteboardA4_2.geometry}
            material={materials.board}
          />
        </group>
      </group>
  );
};
export default EISCFirstFloor;

useGLTF.preload("/models/EISCFirstFloor.glb");
