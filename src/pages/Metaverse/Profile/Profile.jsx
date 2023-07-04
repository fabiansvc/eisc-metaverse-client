import { useLocation } from "react-router-dom";
import Logout from "../../Logout/Logout";
import Avatar from "../Avatar/Avatar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import "./stylesProfile.css";
import { ACESFilmicToneMapping } from "three";
const Profile = () => {
    const location = useLocation();
    const { avatarUrl } = location.state;

    return <>
        <Logout />
        <div style={{ height: "100vh", width: "100vw" }}>
            <Canvas
                camera={{ position: [0, 1, 2] }}
                dpr={[1, 2]}
                flat
                gl={
                    {
                        antialias: true,
                        toneMapping: ACESFilmicToneMapping
                    }
                }
            >
            <ambientLight />
            <directionalLight position={[0, 10, 10]} />
            <OrbitControls makeDefault />
            <Avatar avatarUrl={avatarUrl} type="men" />
        </Canvas>
    </div >
    </>

};
export default Profile;
