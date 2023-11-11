import { useNavigate } from "react-router-dom";
import "./guest-login.css";
import { useAuth } from "../../../context/AuthContext";

const GuestLogin = () => {
  const navigate = useNavigate();
  const { setUserLooged } = useAuth();

  const isNewGuest = () => {
    const guest = window.localStorage.getItem("avatarUrl");
    !guest
      ? navigate("/register-user", { state: "guest" })
      : navigate("/metaverse", { state: "guest" });
  };

  const handleLoginGuestUser = () => {
    setUserLooged("guest")
    isNewGuest();
  };

  return (
    <form className="form-login" onSubmit={(e) => handleLoginGuestUser(e)}>
      <span className="span-form-title">Accede como usuario invitado</span>
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
