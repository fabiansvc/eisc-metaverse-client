import { Sky } from "@react-three/drei";

const Lights = () => {
    return <>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 10]} intensity={1} />
        <Sky/>
    </>
}
export default Lights;