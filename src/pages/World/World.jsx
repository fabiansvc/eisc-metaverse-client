import { PointerLockControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

const World = ({avatarUrl}) => {
    return (
        <Canvas
            dpr={[1, 2]}
            flat
            gl={
                {
                    antialias: true,
                    outputEncoding: sRGBEncoding,
                    toneMapping: ACESFilmicToneMapping

                }
            }
        >
            <PointerLockControls />
            <ambientLight />
            <pointLight position={[0, 10, 0]} />
        
        </Canvas>
    )
}

export default World;

