import "./login.css";
import TitleEISC from "../Components/TitleEISC/TitleEISC";
import UnivalleUserLogin from "./UnivalleUserLogin/UnivalleUserLogin";
import GuestLogin from "./GuestLogin/GuestLogin";

const Login = () => {
  return (
    <div className="container-login">
      <TitleEISC/>
      <div className="card-login">
        <UnivalleUserLogin />
        <GuestLogin />
      </div>
    </div>
  );
};

export default Login;
