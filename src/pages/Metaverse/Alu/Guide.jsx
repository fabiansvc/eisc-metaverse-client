import { Text } from "@react-three/drei";
import { useState } from "react";
import { useGLTF } from "@react-three/drei";

export function Guide(props) {
    const { nodes, materials } = useGLTF("./assets/models/Guide.glb");
    const [currentGretting, setCurrentGretting] = useState(0);
    const [currentGuide, setCurrentGuide] = useState(0);
    const [currentEnd, setCurrentEnd] = useState(0);

    const [grettings] = useState(() => {
        return [
            `¡Hola!, soy Alu.`,
            `Bienvenido al Metaverso de la Escuela de Ingeniería de Sistemas y Computación`,
            `Mi propósito es enseñarle cómo es la navegabilidad en el metaverso`,
            `¡Vamos a empezar!`
        ];
    });

    const [guide] = useState(() => {
        return [
            `Para ir hacia adelante\npresione la tecla "W"\no la flecha "arriba".`,
            `Para ir hacia atrás\npresione la tecla "S"\n o la flecha "abajo".`,
            `Para ir hacia la izquierda\npresione la tecla "A"\n o la flecha "izquierda".`,
            `Para ir hacia la derecha\npresione la tecla "D"\n o la flecha "derecha".`,
            `Para mover la cámara\npresione el "clic izquierdo"\n del mouse y muévalo`,
        ]
    });

    const [end] = useState(() => {
        return [
            `¡Felicidades! ya sabe cómo moverse en el metaverso`,
            `Recuerda que puedes volver a ver este tutorial en cualquier momento`,
            `¡Nos vemos!`
        ]
    });

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
                <group
                    onClick={() => setCurrentGuide(
                        () => currentGuide >= 0 && currentGuide < 4 ? currentGuide + 1 : currentGuide)
                    }
                >
                    <mesh
                        geometry={nodes.ButtonNext_1.geometry}
                        material={materials.iconButton}
                    />
                    <mesh
                        geometry={nodes.ButtonNext_2.geometry}
                        material={materials.buttonRed}
                    />
                </group>
                <group
                    onClick={() => setCurrentGuide(
                        () => currentGuide > 0 && currentGuide <= 4 ? currentGuide - 1 : currentGuide)
                    } >
                    <mesh
                        geometry={nodes.ButtonBack_1.geometry}
                        material={materials.buttonRed}
                    />
                    <mesh
                        geometry={nodes.ButtonBack_2.geometry}
                        material={materials.iconButton}
                    />
                </group>
            </group>
            <Text
                fontSize={0.1}
                color="black"
                position={[0, 0, 0.05]}
                textAlign="center"
            >
                {guide[currentGuide]}
            </Text>
        </group>
    )
}

useGLTF.preload("./assets/models/Guide.glb");