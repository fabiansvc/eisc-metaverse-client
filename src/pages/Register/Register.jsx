import { useAuth } from "../../context/authContext";
import Logout from "../Logout/Logout";
import "./stylesRegister.css";
import { useEffect, useState } from "react";
import { getTeacher } from "../../db/TeachersCollection";
import FormUser from "./FormUser/FormUser";
import FormTeacher from "./FormTeacher/FormTeacher";

const Register = () => {
    const auth = useAuth();
    const { displayName, email } = auth.user
    const [flagIsTeacher, setFlagIsTeacher] = useState(false)

    useEffect(()=>{
        const isTeacher = async(email) =>{
            await getTeacher(email).then((doc)=>{
                doc.empty? setFlagIsTeacher(true): setFlagIsTeacher(false)
            })
        }
    
        if(email)
            isTeacher(email)
    }, [email])

    return (
        <>
            <Logout/>
            {flagIsTeacher? <FormUser displayName={displayName} email={email} /> : <FormTeacher displayName={displayName} email={email}/>}
        </>
    );

};
export default Register;
