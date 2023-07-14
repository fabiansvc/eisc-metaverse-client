import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../db/UsersCollection';
import './stylesFormUser.css'
import { useState } from 'react';
import TitleEISC from '../Components/TitleEISC';

const FormUser = ({ displayName, email }) => {
    const navigate = useNavigate();
    const [valuesUser, setValuesUser] = useState({
        email: email,
        name: displayName,
        nickname: '',
        biography: '',
    });

    const saveDataUser = async (e, valuesUser) => {
        e.preventDefault()
        const newUser = valuesUser;

        if (valuesUser.nickname !== '' && valuesUser.biography !== '') {
            await createUser(newUser).then((docRef) => {
                // console.log("Document written with ID: ", docRef.id);
                navigate('/create-avatar')
            });
        }
    };

    return <>
        <div className="cardFormUser">
            <form className="formUser" onSubmit={(e) => saveDataUser(e, valuesUser)}>
                <TitleEISC title={"Registro de datos de usuario"} />
                <section>
                    <div>
                        <label htmlFor="labelNicknameUser">
                            Nickname
                        </label>
                        <label className='RequiredValue'>
                            *
                        </label>
                        <input
                            id="inputNicknameUser"
                            name='inputNicknameUser'
                            type="text"
                            placeholder="Escribe tu nickname"
                            required={true}
                            onChange={e => setValuesUser({ ...valuesUser, nickname: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="labelNicknameUser">
                            Biografía
                        </label>
                        <label className='RequiredValue'>
                            *
                        </label>
                        <input
                            id="inputBiographyUser"
                            name='inputNicknameUser'
                            type="text"
                            placeholder="Describe brevemente quién eres"
                            required={true}
                            onChange={e => setValuesUser({ ...valuesUser, biography: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="buttonSaveDataUser"
                        disabled={Object.values(valuesUser).map(value => value === '').every(value => value) ? true : false}
                    >
                        Guardar datos
                    </button>
                </section>
            </form>
        </div>
    </>
}

export default FormUser;