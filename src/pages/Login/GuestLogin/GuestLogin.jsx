import { useNavigate } from "react-router-dom";
import "./guest-login.css";

const GuestLogin = () => {
  const navigate = useNavigate();

  const isNewGuest = () => {
    const guest = window.localStorage.getItem("avatarUrl");
    !guest
      ? navigate("/create-avatar", { state: "guest" })
      : navigate("/metaverse", { state: "guest" });
  };

  const handleLoginGuestUser = (e) => {
    e.preventDefault();
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
