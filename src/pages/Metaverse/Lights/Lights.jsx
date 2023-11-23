import { Environment } from "@react-three/drei";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <Environment 
        preset={null} 
        files="/assets/environment/storm4K.hdr" 
        background={true} 
        ground={{
          height: 10,
          radius: 1500,
          scale: 160
        }}
        />
    </>
  );
};
export default Lights;
