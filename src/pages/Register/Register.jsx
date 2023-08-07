import "./register.css";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { getTeacher } from "../../db/TeachersCollection";
import FormUser from "./FormUser/FormUser";
import FormTeacher from "./FormTeacher/FormTeacher";
import Logout from "../Components/Logout/Logout";

const Register = () => {
    const auth = useAuth();
    const { displayName, email } = auth.userLogged
    const [flagTypeForm, setFlagTypeForm] = useState(null)

    const formTypeUser = async (email) => {
        const result = await getTeacher(email)
        result.success ? setFlagTypeForm(false) : setFlagTypeForm(true)
    }

    useEffect(() => {
        formTypeUser(email)
    }, [email])

    return (
        <div className="container-register">
            <Logout />
            <div className="card-form-register">
                {flagTypeForm === null ? null : (flagTypeForm ? (
                    <FormUser displayName={displayName} email={email} />
                ) : (
                    <FormTeacher displayName={displayName} email={email} />
                ))}
            </div>
        </div>
    );

};
export default Register;
