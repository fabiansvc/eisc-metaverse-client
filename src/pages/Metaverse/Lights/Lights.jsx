import { Sky } from "@react-three/drei";

const Lights = () => {
    return <>
        <ambientLight />
        <directionalLight position={[0, 10, 10]} />
        <Sky/>
    </>
}
export default Lights;