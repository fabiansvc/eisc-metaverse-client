/**
 * Component for rendering the login page of the EISC Metaverse application.
 * This component includes subcomponents for logging in with a Univalle user or as a guest.
 */
import "./styles-login.css";
import TitleEISC from "../../components/title-eisc/TitleEISC.jsx";
import UnivalleUserLogin from "./univalle-user-login/UnivalleUserLogin.jsx";
import GuestLogin from "./guest-login/GuestLogin.jsx";
import Footer from "../../components/footer/Footer.jsx";

/**
 * Login functional component.
 * @returns {JSX.Element} The login page UI elements.
 */
const Login = () => {
  return (
    // Container for the login page
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
      {/* Component for footer */}
      <Footer />
    </div>
  );
};

export default Login;
