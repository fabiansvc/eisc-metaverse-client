import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../db/UsersCollection';
import './stylesFormTeacher.css'
import { useState } from 'react';

const FormTeacher = ({ displayName, email }) => {
    const navigate = useNavigate();
    const [valuesTeacher, setValuesTeacher] = useState({
        email: email,
        name: displayName,
        nickname: '',
        biography: '',
        attention_schedule: {
            day: '',
            start: '',
            end: '',
        },
        more_info: '',
    });

    const saveDataTeacher = async (valuesTeacher) => {
        const newUser = valuesTeacher;
        await createUser(newUser).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            navigate('/create-avatar')
        });
    };

    return <>
        <div className="cardFormTeacher">
            <form className="formTeacher">
                <label htmlFor="labelTitleFormTeacher">
                    Registro de datos de Docente
                </label>
                <div>
                    <label htmlFor="labelNicknameTeacher">
                        Nickname
                    </label>
                    <input id="inputNicknameTeacher" name='inputNicknameTeacher' type="text" placeholder="Escribe tu nickname" onChange={e => setValuesTeacher({ ...valuesTeacher, nickname: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="labelNicknameTeacher">
                        Biografía
                    </label>
                    <input id="inputBiographyTeacher" name='inputNicknameTeacher' type="text" placeholder="Describete quién eres" onChange={e => setValuesTeacher({ ...valuesTeacher, biography: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="labelNicknameTeacher">
                        Horarios de atención
                    </label>
                    <div className='atention_schedule'>
                        <div>
                            <label htmlFor="labelNicknameTeacher">
                                Día
                            </label>
                            <input id="inputAtentionScheduleTeacher" name='inputAtentionScheduleTeacher' type="date" onChange={e =>
                                setValuesTeacher({
                                    ...valuesTeacher, attention_schedule: {
                                        day: e.target.value,
                                        start: '',
                                        end: '',
                                    }
                                })
                            } />
                        </div>
                        <div>
                            <label htmlFor="labelNicknameTeacher">
                                Inicio
                            </label>
                            <input id="inputAtentionScheduleTeacher" name='inputAtentionScheduleTeacher' type="time" onChange={e =>
                                setValuesTeacher({
                                    ...valuesTeacher, attention_schedule: {
                                        day: valuesTeacher.attention_schedule.day,
                                        start: e.target.value,
                                        end: '',
                                    }
                                })
                            } />
                        </div>
                        <div>
                            <label htmlFor="labelNicknameTeacher">
                                Fin
                            </label>
                            <input id="inputAtentionScheduleTeacher" name='inputAtentionScheduleTeacher' type="time" onChange={e =>
                                setValuesTeacher({
                                    ...valuesTeacher, attention_schedule: {
                                        day: valuesTeacher.attention_schedule.day,
                                        start: valuesTeacher.attention_schedule.start,
                                        end: e.target.value,
                                    }
                                })
                            } />
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="labelMoreInfoTeacher">
                        Más información
                    </label>
                    <input id="inputMoreInfoTeacher" name='inputMoreInfoTeacher' type="text" placeholder="Ingresa más información de interés" onChange={e => setValuesTeacher({ ...valuesTeacher, more_info: e.target.value })} />
                </div>
                <button
                    type="button"
                    className="buttonSaveDataTeacher"
                    onClick={() => saveDataTeacher(valuesTeacher)}
                >
                    Guardar datos
                </button>
            </form>
        </div>
    </>
}

export default FormTeacher;