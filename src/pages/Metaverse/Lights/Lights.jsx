import { Sky } from "@react-three/drei";

const Lights = () => {
    return <>
        <ambientLight intensity={1} />
        <pointLight position={[0, 2, 0]} intensity={0.5} />
        <Sky/>
    </>
}
export default Lights;