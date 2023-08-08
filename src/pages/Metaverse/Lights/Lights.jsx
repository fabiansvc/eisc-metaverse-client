import { Environment, Sky } from "@react-three/drei";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <Sky />
      <Environment preset="sunset" />
      {/* <Cloud
            position={[10, 80, 10]}
            opacity={1}
            speed={0.4} // Rotation speed
            width={10} // Width of the full cloud
            segments={20} // Number of particles
        /> */}
    </>
  );
};
export default Lights;
