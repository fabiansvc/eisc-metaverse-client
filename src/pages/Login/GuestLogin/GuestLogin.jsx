import { useNavigate } from "react-router-dom";
import "./guest-login.css";
import { useAuth } from "../../../context/AuthContext";

const GuestLogin = () => {
  const {setGuestLogged} = useAuth();
  const navigate = useNavigate();

  const isNewGuest = () => {
    const guest = window.localStorage.getItem("avatarUrl");
    !guest
      ? navigate("/create-avatar", { state: "guest" })
      : navigate("/metaverse", { state: "guest" });
  };

  const handleLoginGuestUser = (e) => {
    e.preventDefault();
    setGuestLogged("guest");
    isNewGuest();
  };

  return (
    <form className="form-login" onSubmit={(e) => handleLoginGuestUser(e)}>
      <span className="span-form-title">Juega como usuario invitado</span>
      <img
        className="user-guest-icon"
        src={"./assets/login/guest.png"}
        alt="User guest"
      />
      <button type="submit" className="button-guest-login">
        Inicia como invitado
      </button>
    </form>
  );
};

export default GuestLogin;
