import EISCFifthFloor from "./components/EISCFifthFloor"
import EISCFirstFloor from "./components/EISCFirstFloor"
import EISCFourthFloor from "./components/EISCFourthFloor"
import EISCSecondFloor from "./components/EISCSecondFloor"
import EISCThirdFloor from "./components/EISCThirdFloor"
import Outside from "./components/Outside"
import Stairs from "./components/Stairs"

const EISC = () => {
    return (
        <>
            <EISCFirstFloor />
            <EISCSecondFloor />
            <EISCThirdFloor />
            <EISCFourthFloor />
            <EISCFifthFloor />
            <Stairs />
            <Outside />
        </>
    )
}
export default EISC;