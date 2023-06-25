import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { getUser, createUser } from "../../db/FirebaseUserCollection";
import useFormattedName from "../../utils/useFormatedName";
import Logout from "../Logout/Logout";
import { useState } from "react";
import "./userRegister.css";

const UserRegister = () => {
    const auth = useAuth();
    const { displayName, email } = auth.user
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState(true);

    const isNewUser = async (email) => {
        if (email){
            await getUser(email)
            .then((doc) => {
                doc.empty ? setNewUser(true) : setNewUser(false)
            })
        }
        
    };

    const saveUser = async (displayName, email) => {
        const newUser = {
            userName: useFormattedName(displayName),
            email: email,
        };

        await createUser(newUser).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            navigate('/create-avatar')
        });
    };

    const createUserView = () => {
        isNewUser(email);
        if (!newUser) {
            navigate('/user-profile')
        } else {
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
                            Crear usuario
                        </button>
                    </form>
                </div>
            </>
        }
    }

    return (
        <>
            {createUserView()}
        </>
    );

};
export default UserRegister;
