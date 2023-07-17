import './form-teacher.css'
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../db/UsersCollection';
import { useState } from 'react';
import AtentionSchedule from './AtentionSchedule/AtentionSchedule';
import TitleEISC from '../../Components/TitleEISC/TitleEISC';

const FormTeacher = ({ displayName, email }) => {
    const navigate = useNavigate();
    const [section, setSection] = useState(1);

    const [valuesTeacher, setValuesTeacher] = useState({
        email: email,
        name: displayName,
        nickname: '',
        biography: '',
        attention_schedule: [],
        more_info: '',
    });


    const saveDataTeacher = async (e, valuesTeacher) => {
        e.preventDefault()
        const newUser = valuesTeacher;
        await createUser(newUser).then((docRef) => {
            navigate('/create-avatar')
        });
    };

    return (
        <form className="form-register" onSubmit={(e) => saveDataTeacher(e, valuesTeacher)}>
            <TitleEISC subtitle={"Registro de datos de Docente"} />
            <section className='section-1' style={{
                display: section === 1 ? 'block' : 'none'
            }} >
                <div>
                    <label htmlFor="nicknameTeacher">
                        Nickname
                    </label>
                    <label className='required-value'>
                        *
                    </label>
                    <input
                        id="nicknameTeacher"
                        name='nicknameTeacher'
                        type="text"
                        placeholder="Escribe tu nickname"
                        required={true}
                        onChange={e => setValuesTeacher({ ...valuesTeacher, nickname: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="biography">
                        Biografía
                    </label>
                    <input
                        id="biography"
                        name='biography'
                        type="text"
                        placeholder="Describete quién eres"
                        onChange={e => setValuesTeacher({ ...valuesTeacher, biography: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="moreInfoTeacher">
                        Más información
                    </label>
                    <input
                        id="moreInfoTeacher"
                        name='moreInfoTeacher'
                        type="text"
                        placeholder="Ingresa más información de interés"
                        onChange={e => setValuesTeacher({ ...valuesTeacher, more_info: e.target.value })}
                    />
                </div>
                <button
                    type="button"
                    className="button-next"
                    onClick={() => setSection(2)}
                >
                    Siguiente
                </button>
            </section>
            <section className='section-2' style={{
                display: section === 2 ? 'block' : 'none'
            }}>
                <span className="span-atention-schedule">
                    Horarios de atención:
                </span>
                <div className="form-atention-schedule-teacher">
                    <AtentionSchedule valuesTeacher={valuesTeacher} setValuesTeacher={setValuesTeacher} />
                    <button
                        type="button"
                        role="button"
                        className="button-add-new-atention-schedule"
                        aria-label='Agregar horario de atención'
                        title="Agregar un nuevo horario de atención"
                        onClick={() => {
                            setValuesTeacher({
                                ...valuesTeacher,
                                atention_schedule: [
                                    ...valuesTeacher.atention_schedule,
                                    atentionSchedule,
                                ],
                            });
                        }}
                    />
                </div>
                <button
                    type="button"
                    role="button"
                    className="button-back"
                    onClick={() => setSection(1)}
                >
                    Anterior
                </button>
                <button
                    type="submit"
                    className="button-save-data-teacher"
                >
                    Guardar datos
                </button>
            </section>
        </form>
    )
}

export default FormTeacher;