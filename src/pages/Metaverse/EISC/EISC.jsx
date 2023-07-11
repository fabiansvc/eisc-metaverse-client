import { RigidBody } from '@react-three/rapier';

const EISC = () => {

    return (
        <RigidBody type='fixed'>
            <gridHelper position-y={0.01} args={[100, 100]}/>
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeBufferGeometry args={[100, 100]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </RigidBody>
    )
}
export default EISC;
