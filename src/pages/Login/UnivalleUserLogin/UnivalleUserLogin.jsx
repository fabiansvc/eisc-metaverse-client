import "./univalle-user-login.css"
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { getUser } from "../../../db/UsersCollection";
import { useState } from "react";

const UnivalleUserLogin = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState(true);

    const isNewUser = async (email) => {
        await getUser(email)
            .then((doc) => {
                doc.empty ? navigate('/user-register') : navigate('/create-avatar')
            })
    };

    const handleLoginUserUnivalle = async (e) => {
        e.preventDefault();
        
        await auth.loginWithGoogle().then((res) => {
            if (res.success) {
                isNewUser(res.data.user.email)
            } else {
                setLoginSuccess(false)
            }
        })
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
            {!loginSuccess && <p className="error-login">{"El dominio debe ser @correounivalle.edu.co"}</p>}
        </form>
    )
}

export default UnivalleUserLogin;