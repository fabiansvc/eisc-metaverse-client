/**
 * Component for rendering the login page of the EISC Metaverse application.
 * This component includes subcomponents for logging in with a Univalle user or as a guest.
 */
import "./login.css";
import UnivalleUserLogin from "./UnivalleUserLogin/UnivalleUserLogin";
import GuestLogin from "./GuestLogin/GuestLogin";
import TitleEISC from "../../components/TitleEISC/TitleEISC";

/**
 * Login functional component.
 * @returns {JSX.Element} The login page UI elements.
 */
const Login = () => {
  return (
    <div className="container-login">
      {/* Title of the EISC Metaverse */}
      <TitleEISC />

      {/* Login card containing Univalle user login and guest login options */}
      <div className="card-login">
        {/* Component for logging in with a Univalle user */}
        <UnivalleUserLogin />

        {/* Component for logging in as a guest */}
        <GuestLogin />
      </div>
    </div>
  );
};

export default Login;
