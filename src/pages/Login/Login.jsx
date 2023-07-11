import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../db/UsersCollection";
import "./stylesLogin.css";

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState(null);

    useEffect(() => {
        const isNewUser = async (email) => {
            const user = await getUser(email)
                .then((doc) => {
                    doc.empty ? navigate('/user-register') :  navigate('/create-avatar')
                })
        };

        if (loginSuccess) {
            const { email } = auth.user
            isNewUser(email)
        }
    }, [loginSuccess, navigate]);

    const handleLoginUserUnivalle = async (e) => {
        e.preventDefault();
        const response = await auth.loginWithGoogle();
        if (response.success) {
            setLoginSuccess(true);
        } else {
            setLoginSuccess(false);
        }
    };

    const handleLoginGuestUser = (e) => {
        e.preventDefault();
        navigate('/create-avatar');
    };

    const titleLoginView = () => {
        return <div className="titleLogin">
            <img className="logoUnivalle" src={"./assets/univalle/univalle.svg"} alt="Logo Univalle" />
            <label className="labelEISCMetaverse" htmlFor="labelEISCMetaverse">
                EISC Metaverse
            </label>
            <p className="pSubtitleLogin">
                Inicia sesión crea una cuenta
            </p>
        </div>
    }

    const loginUserUnivalleView = () => {
        return (
            <form className="formLogin">
                <label className="labelLogin" htmlFor="labelLogin">
                    Juega usando tu cuenta institucional
                </label>
                <button className="buttonLogin" onClick={(e) => handleLoginUserUnivalle(e)} >
                    <FcGoogle className="iconGoogle" />
                </button>
                {loginSuccess === false && <p className="errorLogin">{"El dominio debe ser @correounivalle.edu.co"}</p>}
            </form>
        )
    }

    const loginGuestUserView = () => {
        return (
            <form className="formLogin">
                <label className="labelLogin" htmlFor="labelLogin">
                    Juega como usuario invitado
                </label>
                <button className="buttonLoginGuest" onClick={(e) => handleLoginGuestUser(e)} >
                    Inicia como Invitado
                </button>
            </form>
        )
    }


    return (
        <div className="login">
            {titleLoginView()}
            <div className="cardLogin">
                {loginUserUnivalleView()}
                {loginGuestUserView()}
            </div>
        </div>
    )
}

export default Login;