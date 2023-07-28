import { Sky, useHelper } from "@react-three/drei";
import { useRef } from "react";
import { PointLightHelper } from "three";

const Lights = () => {
    const pointLightRef = useRef();
    useHelper(pointLightRef, PointLightHelper, "cyan")
    return <>
        <ambientLight intensity={1} />
        <pointLight ref={pointLightRef} castShadow position={[0, 0, 0]} intensity={0.5} />
        <Sky/>
    </>
}
export default Lights;