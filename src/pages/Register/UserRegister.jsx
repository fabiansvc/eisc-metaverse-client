import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { getUser, createUser } from "../../db/UsersCollection";
import useFormattedName from "../../utils/useFormatedName";
import Logout from "../Logout/Logout";
import "./userRegister.css";
import { useEffect, useState } from "react";
import { getTeacher } from "../../db/TeachersCollection";

const UserRegister = () => {
    const auth = useAuth();
    const { displayName, email } = auth.user
    const navigate = useNavigate();
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

    const saveUser = async (displayName, email) => {
        const newUser = {
            userName: useFormattedName(displayName),
            email: email
        };

        await createUser(newUser).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            navigate('/create-avatar')
        });
    };

    const formUserView = () => {
        return <>
            <Logout />
            <div className="cardUserRegister">

                <form className="formUserRegister">
                    <div className="nickname">
                        <label className="labelNickname" htmlFor="nickname">
                            Nickname
                        </label>
                        <input className="inputNickname" id="nickname" type="text" placeholder="Escribe tu nickname"></input>
                    </div>
                    <button
                        type="button"
                        className="buttonSaveUser"
                        onClick={() => saveUser(displayName, email)}
                    >
                        Guardar datos
                    </button>
                </form>
            </div>
        </>
    }
    const formTeacherView = () => {
        return <>
            <Logout />
            <div className="cardUserRegister">
                <form className="formUserRegister">
                    <div className="nickname">
                        <label className="labelNickname" htmlFor="nickname">
                            Nickname
                        </label>
                        <input className="inputNickname" id="nickname" type="text" placeholder="Escribe tu nickname"></input>
                    </div>
                    <button
                        type="button"
                        className="buttonSaveUser"
                        onClick={() => saveUser(displayName, email)}
                    >
                        Guardar datos
                    </button>
                </form>
            </div>
        </>
    }

    return (
        <>
            {flagIsTeacher? formUserView() : formTeacherView()}
        </>
    );

};
export default UserRegister;
