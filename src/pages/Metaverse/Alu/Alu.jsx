import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Text, Html, Float, Text3D, Center } from "@react-three/drei";
import { Guide } from "./Guide";
import { useUser } from "../../../context/UserContext";

const Alu = (props) => {
  const aluRef = useRef();
  const { nodes, materials, animations } = useGLTF("/assets/models/Alu.glb");
  const { actions } = useAnimations(animations, aluRef);
  const [startTutorial, setStartTutorial] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { user } = useUser();
  const { firstTime } = user;

  const onHandleAllu = (e) => {
    setClicked(true);
  }

  useEffect(() => {
    if (clicked) {
      setStartTutorial(true);
      setClicked(false);
    }
  }, [clicked]); 
  

  useEffect(() => {
    actions["Idle"].play();
  }, [actions, aluRef]);

  return (
    <group ref={aluRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" scale={0.4} >
          <group name="Allu" onClick={(e)=>onHandleAllu(e)}>
            <skinnedMesh
              name="Allu_1"
              geometry={nodes.Allu_1.geometry}
              material={materials.body}
              skeleton={nodes.Allu_1.skeleton}
            />
            <skinnedMesh
              name="Allu_2"
              geometry={nodes.Allu_2.geometry}
              material={materials.foot}
              skeleton={nodes.Allu_2.skeleton}
            />
            <skinnedMesh
              name="Allu_3"
              geometry={nodes.Allu_3.geometry}
              material={materials.eye}
              skeleton={nodes.Allu_3.skeleton}
            />
            <skinnedMesh
              name="Allu_4"
              geometry={nodes.Allu_4.geometry}
              material={materials.noise}
              skeleton={nodes.Allu_4.skeleton}
            />
          </group>
          <primitive object={nodes.spine} />
        </group>
      </group>
      {
        firstTime === true || startTutorial === true ?
          null :
          <Float
            distance={0.5}
            size={0.5}
            speed={1}
            factor={0.5}
            damping={0.5}
          >
            <Center
              position={[0, props.position[1] + 1.25, 0]}
            >
              <Text3D
                bevelEnabled
                bevelSize={0.01}
                bevelThickness={0.01}
                height={0.02}
                lineHeight={1}
                letterSpacing={0.01}
                size={0.1}
                font="/assets/fonts/OpenSansRegular.json"
              >
                {`Click sobre mi para\n  iniciar el tutorial`}
                <meshStandardMaterial color={"orange"} />
              </Text3D>
            </Center>
          </Float>
      }
      {
        firstTime === true || startTutorial === true ?
          <Guide setStartTutorial={setStartTutorial} position-y={props.position[1] + 1.5} />
          : null
      }
    </group>

  );
}
export default Alu;
useGLTF.preload("/assets/models/Alu.glb");