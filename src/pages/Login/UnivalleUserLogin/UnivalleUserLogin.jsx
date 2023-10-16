import "./univalle-user-login.css";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getUser } from "../../../db/user-collection";
import { useState } from "react";

const UnivalleUserLogin = () => {
  const {loginWithGoogle} = useAuth();
  const [loginSuccess, setLoginSuccess] = useState(true);

  const isNewUser = async (email) => {
    const user = await getUser(email);
    if (user.success) {
      useNavigate("/metaverse", { state: "user" });
    } else {
      useNavigate("/register-user", { state: "user" });
    }
  };

  const handleLoginUserUnivalle = async (e) => {
    e.preventDefault();
    const result = await loginWithGoogle();

    if (result.success) {
      isNewUser(result.data.user.email);
    } else {
      setLoginSuccess(false);
    }
  };

  return (
    <form className="form-login">
      <span className="span-form-title">
        Juega usando tu cuenta institucional
      </span>
      <img
        className="institutional-card"
        src={"./assets/login/institutional_card.png"}
        alt="Institutional Card"
      />
      <button
        className="button-login"
        onClick={(e) => handleLoginUserUnivalle(e)}
      >
        <FcGoogle className="icon-google" />
      </button>
      {!loginSuccess && (
        <p className="error-login">
          {"El dominio debe ser @correounivalle.edu.co"}
        </p>
      )}
    </form>
  );
};

export default UnivalleUserLogin;
