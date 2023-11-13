import EISCFirstFloor from "./components/EISCFirstFloor"
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
            <Outside />
            <Stairs />
        </>
    )
}
export default EISC;