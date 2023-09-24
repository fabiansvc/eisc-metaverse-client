import { Environment } from "@react-three/drei";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <Environment preset={null} files="/assets/environment/storm.hdr" scene={undefined} encoding={undefined} background={false} blur={1} />
    </>
  );
};
export default Lights;
