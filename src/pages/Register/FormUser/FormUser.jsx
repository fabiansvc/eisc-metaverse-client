import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../db/UsersCollection';
import useFormattedName from '../../../utils/useFormatedName';
import './stylesFormUser.css'
import { useState } from 'react';

const FormUser = ({displayName, email}) => {
    const navigate = useNavigate();  
    const [nickName, setNickName] = useState('');

    const saveDataUser = async (displayName, email) => {
        const newUser = {
            userName: useFormattedName(displayName),
            email: email,
            nickName: nickName
        };
    
        await createUser(newUser).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            navigate('/create-avatar')
        });
    };

    return <>
        <div className="cardFormUser">
            <form className="formUser">
                <label className="labelTitleFormUser" htmlFor="labelTitleFormUser">
                    Registro de datos de Usuario
                </label>
                <div className="nicknameUser">  
                    <label className="labelNicknameUser" htmlFor="labelNicknameUser">
                        Nickname
                    </label>
                    <input className="inputNicknameUser" id="inputNicknameUser" type="text" placeholder="Escribe tu nickname" onChange={e=>setNickName(e.target.value)}/>
                </div>
                <button
                    type="button"
                    className="buttonSaveDataUser"
                    onClick={() => saveDataUser(displayName, email)}
                >
                    Guardar datos
                </button>
            </form>
        </div>
    </>
}

export default FormUser;