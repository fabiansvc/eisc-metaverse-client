import { Text } from "@react-three/drei";
import { useState } from "react";

export function Guide(props) {
    const [guide] = useState(() => {
        return {
            greetings: {
                text: "¡Hola!, soy Alu.",
                size: [1, 0.4]
            },
            welcome: `Bienvenido al Metaverso de la\nEscuela de Ingeniería de Sistemas y Computación`,
            start: "Mi propósito es enseñarle cómo es la navegabilidad en el metaverso",
            instructions: {
                step1: "Para ir hacia adelante presione la tecla W",
                step2: "Para ir hacia atrás presione la tecla S",
                step3: "Para ir hacia la izquierda presione la tecla A",
                step4: "Para ir hacia la derecha presione la tecla D",
                step5: "Para mover la cámara presione el clic izquierdo del mouse y muévalo en la dirección que desee",
            },
            end: "¡Felicidades! Ya sabes cómo navegar en el metaverso"
        };
    });

    return (
        <>
            <mesh position-y={1.25}>
                <planeGeometry args={guide.greetings.size} />
                <meshStandardMaterial color="white" />
            </mesh>
            <Text
                fontSize={0.1}
                color="black"
                position={[0, 1.25, 0.01]}
                textAlign="center"

            >
                {guide.greetings.text}
            </Text>
        </>

    )
}
