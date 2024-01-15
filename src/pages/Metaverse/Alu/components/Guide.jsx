import { Text } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { editUser } from "../../../../db/user-collection";
import { useUser } from "../../../../context/UserContext";

export function Guide({ startTutorial, setStartTutorial, ...props }) {
    const { nodes, materials } = useGLTF("./assets/models/Guide.glb");
    const [currentGretting, setCurrentGretting] = useState(0);
    const [currentGuide, setCurrentGuide] = useState(0);
    const [currentEnd, setCurrentEnd] = useState(0);
    const [text, setText] = useState("");
    const { user } = useUser();
    const { type } = user;

    const grettings = [
        `¡Hola!, soy Alu`,
        `Bienvenido al Metaverso de la\nEscuela de Ingeniería de\nSistemas y Computación`,
        `Mi propósito es enseñarle\ncómo navegar en el metaverso`,
        `¡Vamos a empezar!`
    ];

    const guide = [
        `Para ver su alrededor\n manten presionado\nel "clic izquierdo"\n del mouse y muévalo`,
        `Para ir hacia adelante\npresione la tecla "W"\no la flecha "arriba"`,
        `Para ir hacia atrás\npresione la tecla "S"\n o la flecha "abajo"`,
        `Para ir hacia la izquierda\npresione la tecla "A"\n o la flecha "izquierda"`,
        `Para ir hacia la derecha\npresione la tecla "D"\n o la flecha "derecha"`,
        `Para navegar en el metaverso\npresiona en simultaneo\nalguna tecla y el mouse`,
    ]

    const end = [
        `¡Felicidades!, ya sabes\ncomo navegar en el metaverso`,
        `Recuerda que para ver\nde nuevo este tutorial\nvisitame en este lugar`,
        `¡Nos vemos!`
    ]

    const updateFirstTime = async () => {
        if (type === "user") {
            const newUser = user;
            newUser.firstTime = false;
            await editUser(newUser.email, newUser)
        } else if (type === "guest") {
            window.localStorage.setItem("firstTime", false);
        }
    }

    useEffect(() => {
        if (startTutorial) {
            if (currentGretting < grettings.length) {
                setTimeout(() => setCurrentGretting(currentGretting + 1), 3500);
                setText(grettings[currentGretting]);
            } else if (currentGretting === grettings.length && currentGuide < guide.length) {
                setText(guide[currentGuide]);
            } else if (currentGretting === grettings.length && currentGuide === guide.length && currentEnd < end.length) {
                setTimeout(() => setCurrentEnd(currentEnd + 1), 3500);
                setText(end[currentEnd]);
            } else if (currentGretting === grettings.length && currentGuide === guide.length && currentEnd === end.length) {
                if (user.firstTime)
                    updateFirstTime();
                setStartTutorial(false);
                setCurrentGretting(0);
                setCurrentGuide(0);
                setCurrentEnd(0);
                setText("");
            }
        }

    }, [startTutorial, currentGretting, currentGuide, currentEnd]);

    return (
        <group {...props} dispose={null}>
            <group>
                <group>
                    <mesh
                        geometry={nodes.Guide_1.geometry}
                        material={materials.boardGray}
                    />
                    <mesh geometry={nodes.Guide_2.geometry} material={materials.board} />
                </group>
                {
                    currentGuide > 0 && currentGuide < guide.length ?
                        <group onClick={() => setCurrentGuide(currentGuide - 1)}>
                            <mesh
                                geometry={nodes.ButtonBack_1.geometry}
                                material={materials.buttonRed}
                            />
                            <mesh
                                geometry={nodes.ButtonBack_2.geometry}
                                material={materials.iconButton}
                            />
                        </group>
                        : null
                }
                {
                    currentGretting === grettings.length && currentGuide < guide.length ?
                        <group onClick={() => setCurrentGuide(currentGuide + 1)}>
                            <mesh
                                geometry={nodes.ButtonNext_1.geometry}
                                material={materials.iconButton}
                            />
                            <mesh
                                geometry={nodes.ButtonNext_2.geometry}
                                material={materials.buttonRed}
                            />
                        </group>
                        : null
                }
            </group>
            <Text fontSize={0.1} color="black" position={[0, 0, 0.05]} textAlign="center">
                {text}
            </Text>
        </group>
    )
}

useGLTF.preload("./assets/models/Guide.glb");