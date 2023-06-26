import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../db/UsersCollection';
import useFormattedName from '../../../utils/useFormatedName';
import './stylesFormTeacher.css'
import { useState } from 'react';

const FormTeacher = ({displayName, email}) => {
    const navigate = useNavigate();  
    const [nickName, setNickName] = useState('');

    const saveDataTeacher = async (displayName, email) => {
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
        <div className="cardFormTeacher">
            <form className="formTeacher">
                <label className="labelTitleFormTeacher" htmlFor="labelTitleFormTeacher">
                    Registro de datos de Docente
                </label>
                <div className="nicknameTeacher">  
                    <label className="labelNicknameTeacher" htmlFor="labelNicknameTeacher">
                        Nickname
                    </label>
                    <input className="inputNicknameTeacher" id="inputNicknameTeacher" type="text" placeholder="Escribe tu nickname" onChange={e=>setNickName(e.target.value)}/>
                </div>
                <button
                    type="button"
                    className="buttonSaveDataTeacher"
                    onClick={() => saveDataTeacher(displayName, email)}
                >
                    Guardar datos
                </button>
            </form>
        </div>
    </>
}

export default FormTeacher;