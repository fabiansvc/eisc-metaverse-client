/**
 * Component for rendering the login page of the EISC Metaverse application.
 * This component includes subcomponents for logging in with a Univalle user or as a guest.
 */
import "./stylesLogin.css";
import UnivalleUserLogin from "./UnivalleUserLogin/UnivalleUserLogin";
import GuestLogin from "./GuestLogin/GuestLogin";
import TitleEISC from "../../components/TitleEISC/TitleEISC";
import Footer from "../../components/Footer/Footer";
import { Fragment } from "react";

/**
 * Login functional component.
 * @returns {JSX.Element} The login page UI elements.
 */
const Login = () => {
  return (
    // Container for the login page
    <Fragment>
      <div className="container-login">
        {/* Title of the EISC Metaverse */}
        <TitleEISC />

        {/* Login card containing Univalle user login and guest login options */}
        <div className="card-login">
          {/* Component for logging in with a Univalle user */}
          <UnivalleUserLogin />

          {/* Component for logging in as a guest */}
          <GuestLogin />

          {/* Component for footer */}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Login;
