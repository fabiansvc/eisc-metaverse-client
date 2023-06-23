import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { TbLogout } from "react-icons/tb";
import "./logout.css";

const Logout = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        auth.logout();
        navigate('/');
    };
    return (
        <div className="logout">
            <button 
                type="button" 
                onClick={(e) => { handleLogout(e) }} 
            >
                <TbLogout className="iconLogout"/>
            </button>
        </div>
    )
};
export default Logout;
