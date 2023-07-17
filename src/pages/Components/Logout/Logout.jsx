import "./logout.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { TbLogout } from "react-icons/tb";

const Logout = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        auth.logout();
        navigate('/');
    };

    return (
        <div className="container-logout">
            <button 
                type="button" 
                role="button"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
                className="button-logout"
                onClick={(e) => { handleLogout(e) }} 
            >
                <TbLogout className="icon-logout"/>
            </button>
        </div>
    )
};
export default Logout;