import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleGoogle = async (e) => {
        e.preventDefault();
        await auth.loginWithGoogle();
        navigate('/user-register');
    };
    return (
        <div className="cardLogin">
            <form className="formLogin">
                <img className="logoUnivalle" src={"./assets/univalle/univalle.svg"} alt="Logo Univalle"  />
                <label className="labelEISCMetaverse" htmlFor="labelEISCMetaverse">
                    EISC Metaverse
                </label>
                <p className="pSubtitleLogin">
                    Interactua en el metaverso con tus compañeros
                </p>
                <label className="labelLogin" htmlFor="labelLogin">
                    Inicia sesión o registra tu cuenta
                </label>
                <button className="buttonGoogleLogin" onClick={(e) => handleGoogle(e)} >
                    <FcGoogle className="iconGoogle"/>
                </button>
            </form>
        </div>


    )
};

export default Login;