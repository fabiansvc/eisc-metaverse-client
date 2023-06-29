import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../db/UsersCollection';
import useFormattedName from '../../../utils/useFormatedName';
import './stylesFormUser.css'
import { useState } from 'react';

const FormUser = ({displayName, email}) => {
    const navigate = useNavigate();  
    const [valuesUser, setValuesUser] = useState({
        email: email,
        name: displayName,
        nickname: '',
        biography: '',
    });

    const saveDataUser = async (valuesUser) => {
        const newUser = valuesUser;
    
        await createUser(newUser).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            navigate('/create-avatar')
        });
    };

    return <>
        <div className="cardFormUser">
            <form className="formUser">
                <label htmlFor="labelTitleFormUser">
                    Registro de datos de Usuario
                </label>
                <div>  
                    <label htmlFor="labelNicknameUser">
                        Nickname
                    </label>
                    <input id="inputNicknameUser" name='inputNicknameUser' type="text" placeholder="Escribe tu nickname" onChange={e=>setValuesUser({...valuesUser, nickname: e.target.value})}/>
                </div>
                <div>  
                    <label htmlFor="labelNicknameUser">
                        Biografía
                    </label>
                    <input id="inputBiographyUser" name='inputNicknameUser' type="text" placeholder="Describe brevemente quien eres" onChange={e=>setValuesUser({...valuesUser, biography: e.target.value})}/>
                </div>
                <button
                    type="button"
                    className="buttonSaveDataUser"
                    onClick={() => saveDataUser(valuesUser)}
                >
                    Guardar datos
                </button>
            </form>
        </div>
    </>
}

export default FormUser;