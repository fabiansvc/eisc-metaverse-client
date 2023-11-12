import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Guide } from "./Guide";

const Alu = (props) => {
  const aluRef = useRef();
  const { nodes, materials, animations } = useGLTF("/assets/models/Alu.glb");
  const { actions } = useAnimations(animations, aluRef);
  const [isTutorialFinished, setIsTutorialFinished] = useState(false);

  useEffect(() => {
      actions["Idle"].play();
  }, [actions, aluRef]);

  return (
      <group ref={aluRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" scale={0.4}>
          <group name="Allu">
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
      </group>{
        isTutorialFinished ? 
          null :
          <Guide setIsTutorialFinished={setIsTutorialFinished} position-y={props.position[1] + 1.5}/>
      }
    </group>

  );
}
export default Alu;
useGLTF.preload("/assets/models/Alu.glb");