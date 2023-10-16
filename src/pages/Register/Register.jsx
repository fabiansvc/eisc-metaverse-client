import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getTeacher } from "../../db/teachers-collection";
import FormUser from "./FormUser/FormUser";
import FormTeacher from "./FormTeacher/FormTeacher";
import Logout from "../Components/Logout/Logout";
import "./register.css";

const Register = () => {
  const { userLogged } = useAuth();
  const { email } = userLogged;
  const [flagTypeForm, setFlagTypeForm] = useState("");

  const formTypeUser = async (email) => {
    if (email) {
      const result = await getTeacher(email);
      setFlagTypeForm(result.sucess);
    }
  };

  useEffect(() => {
    formTypeUser(email);
  }, [email]);

  return (
    <div className="container-register">
      <Logout />
      <div className="card-form-register">
        {flagTypeForm === "user" && <FormUser />}
        {flagTypeForm === "teacher" && <FormTeacher />}
      </div>
    </div>
  );
};
export default Register;
