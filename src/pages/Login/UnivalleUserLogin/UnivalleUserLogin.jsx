import "./univalle-user-login.css"
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { getUser } from "../../../db/UsersCollection";

const UnivalleUserLogin = () => {    
    const auth = useAuth();
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState(null);

    useEffect(() => {
        const isNewUser = async (email) => {
            const user = await getUser(email)
                .then((doc) => {
                    doc.empty ? navigate('/user-register') : navigate('/create-avatar')
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

    return (
        <form className="form-login">
            <span className="span-form-title">
                Juega usando tu cuenta institucional
            </span>
            <img className="institutional-card" src={"./assets/login/institutional_card.png"} alt="Institutional Card" />
            <button className="button-login" onClick={(e) => handleLoginUserUnivalle(e)} >
                <FcGoogle className="icon-google" />
            </button>
            {loginSuccess === false && <p className="error-login">{"El dominio debe ser @correounivalle.edu.co"}</p>}
        </form>
    )
}

export default UnivalleUserLogin;