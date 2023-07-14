const TitleEISC = ({title}) => {

    return (
        <div className="TitleEISC">
            <img className="logoUnivalle" src={"./assets/univalle/univalle.svg"} alt="Logo Univalle" />
            <label className="labelEISCMetaverse" htmlFor="labelEISCMetaverse">
                EISC Metaverse
            </label>
            <label className='LabelTitle' htmlFor="labelTitleFormTeacher">
                {title}
            </label>
        </div>
    )
}

export default TitleEISC;