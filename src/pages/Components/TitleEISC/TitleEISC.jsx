import "./title-eisc.css"

const TitleEISC = ({ subtitle }) => {

    return (
        <div className="container-title-eisc">
            <img className="logo-univalle" src={"./assets/univalle/univalle.svg"} alt="Logo Univalle" />
            <span className="span-title">
                EISC Metaverse
            </span>
            <span className='span-subtitle'>
                {subtitle}
            </span>
        </div>
    )
}

export default TitleEISC;