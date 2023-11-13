import "./login.css";
import UnivalleUserLogin from "./UnivalleUserLogin/UnivalleUserLogin";
import GuestLogin from "./GuestLogin/GuestLogin";
import TitleEISC from "../../components/TitleEISC/TitleEISC";

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
