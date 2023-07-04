const Lights = () => {
    return <>
        <ambientLight />
        <directionalLight position={[0, 10, 10]} />
    </>
}
export default Lights;