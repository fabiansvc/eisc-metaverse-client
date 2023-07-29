import { Environment, Sky } from "@react-three/drei";

const Lights = () => {
    return <>
        <ambientLight intensity={1} />
        <Environment preset="city" />
        <Sky />
    </>
}
export default Lights;