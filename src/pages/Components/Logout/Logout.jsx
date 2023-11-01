import "./logout.css";
import { useAuth } from "../../../context/AuthContext";
import { TbLogout } from "react-icons/tb";
import { useSocket } from "../../../context/SocketContex";
import { useUser } from "../../../context/UserContext";

const Logout = () => {
  const auth = useAuth();
  const user = useUser();
  const socket = useSocket();

  const handleLogout = () => {
    socket.disconnectAvatar(user.nickname).then(() => {
      auth.logout();
      window.location.href = "/";
    })
  };

  return (
    <div className="container-logout">
      <button
        type="button"
        role="button"
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
        className="button-logout"
        onClick={handleLogout}
      >
        <TbLogout className="icon-logout" />
      </button>
    </div>
  );
};
export default Logout;
