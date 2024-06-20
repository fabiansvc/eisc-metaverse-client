import "./register.css";
import { useEffect, useState } from "react";
import { getTeacher } from "../../db/teachers-collection";
import FormUser from "./FormUser/FormUser";
import FormTeacher from "./FormTeacher/FormTeacher";
import { useLocation } from "react-router-dom";
import FormGuest from "./FormGuest/FormGuest";
import Logout from "../../components/Logout/Logout";
import { useAuth } from "../../context/AuthContext";

/**
 * Register component
 * @returns {JSX.Element} Register component
 */
const Register = () => {
  const auth = useAuth();
  const location = useLocation()
  const [flagTypeForm, setFlagTypeForm] = useState("");
  const type = location.state
  const { email } = auth.userLogged;

  /**
   * Fetches teacher information based on the provided email
   * @param {string} email - User email
   */
  const formTypeUser = async (email) => {
    if (email) {
      const result = await getTeacher(email);
      setFlagTypeForm(result.type);
    }
  };

  useEffect(() => {
    if(type !== "guest")
      formTypeUser(email);
    else
      setFlagTypeForm("guest")
  }, [email]);

  return (
    <div className="container-register">
      <Logout />
      <div className="card-form-register">
        {flagTypeForm === "user" && <FormUser />}
        {flagTypeForm === "teacher" && <FormTeacher />}
        {flagTypeForm === "guest" && <FormGuest />}
      </div>
    </div>
  );
};
export default Register;
