import { Navigate } from "react-router-dom";
import "./guest-login.css"

const GuestLogin = () => {

    const handleLoginGuestUser = (e) => {
        e.preventDefault();
        Navigate('/create-avatar');
    };

    return (
        <form className="form-login" onSubmit={(e) => handleLoginGuestUser(e)}>
            <span className="span-form-title">
                Juega como usuario invitado
            </span>
            <img className="user-guest-icon" src={"./assets/login/guest.png"} alt="User guest" />
            <button 
                type="submit"
                className="button-guest-login"
            >
                Inicia como invitado
            </button>
        </form>
    )
}

export default GuestLogin;