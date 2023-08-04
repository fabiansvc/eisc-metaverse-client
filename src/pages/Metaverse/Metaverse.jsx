import { Canvas } from "@react-three/fiber";
import Avatar from "./Avatar/Avatar";
import Controls from "./Controls/Controls";
import Lights from "./Lights/Lights";
import { KeyboardControls } from "@react-three/drei";
import useMovements from '../../utils/useMovements'
import Instructive from "./Instructive/Instructive";
import { Suspense, useEffect } from "react";
import { Physics } from "@react-three/rapier"
import EISC from "./EISC/EISC";
import Logout from "../Components/Logout/Logout";
import { Perf } from "r3f-perf";
import { getUser } from "../../db/UsersCollection";
import { useAuth } from "../../context/authContext";
import { useUser } from "../../context/userContext";

const Metaverse = () => {
    const auth = useAuth();
    const { email } = auth.userLogged
    const movements = useMovements();
    const { user, setUser } = useUser();

    const cameraSettings = {
        position: [0, 1.2, 1],
        fov: 60,
        near: 0.1,
        far: 50,
    }
    const glSettings = {
        antialias: true,
    }

    const setValuesUser = async (email) => {
        const result = await getUser(email)

        if (result.success && result.data.length > 0) {
            setUser({
                ...user,
                email: result.data[0].email,
                avatarUrl: result.data[0].avatar_url,
                animation: "Idle",
                position: [0, 0, 0],
                rotation: [0, 0, 0],     
                ref: null,
                body: null,           
            })
        }
    }

    useEffect(() => {
        setValuesUser(email)
    }, [email])

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Suspense fallback={<Instructive />}>
                <Logout />
                <KeyboardControls map={movements} >
                    <Canvas
                        shadows={true}
                        camera={cameraSettings}
                        dpr={[1, 2]}
                        flat
                        gl={glSettings}
                        performance={{ min: 0.5 }}
                    >
                        <Perf position="top-left" />
                        <Lights />
                        <Physics debug={false}>
                            <EISC />
                            {user && <Avatar/>}
                        </Physics>
                        <Controls />
                    </Canvas>
                </KeyboardControls>
            </Suspense>
        </div>
    );
};

export default Metaverse;

