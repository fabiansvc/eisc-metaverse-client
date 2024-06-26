import "./styles-register.css";
import { useEffect, useState } from "react";
import { getTeacher } from "../../db/teachers-collection";
import FormUser from "./form-user/FormUser";
import FormTeacher from "./form-teacher/FormTeacher";
import { useLocation } from "react-router-dom";
import Logout from "../../components/logout/Logout";
import { useAuth } from "../../context/AuthContext";
import FormGuest from "./form-guest/FormGuest";

/**
 * Register component
 * @returns {JSX.Element} Register component
 */
export default function Register () {
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
