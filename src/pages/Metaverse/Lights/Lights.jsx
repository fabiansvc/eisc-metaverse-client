import { Cloud, Environment } from "@react-three/drei";
import { Suspense } from "react";
const Lights = () => {
    return <>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
            <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/lilienstein_4k.hdr" background={true}/>
        </Suspense>
        {/* <Cloud
            position={[10, 80, 10]}
            opacity={1}
            speed={0.4} // Rotation speed
            width={10} // Width of the full cloud
            segments={20} // Number of particles
        /> */}
    </>
}
export default Lights;