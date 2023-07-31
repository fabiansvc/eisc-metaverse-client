import './form-teacher.css'
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../db/UsersCollection';
import { useState } from 'react';
import AtentionSchedule from './AtentionSchedule/AtentionSchedule';
import TitleEISC from '../../Components/TitleEISC/TitleEISC';

const FormTeacher = ({ displayName, email }) => {
    const navigate = useNavigate();
    const [section, setSection] = useState(1);
    const [atentionSchedule, setAtentionSchedule] = useState([{}]);

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
            docRef.success ? navigate('/create-avatar') : alert("Error al guardar los datos")
        });
    };

    const handleAddNewAtentionSchedule = () => {
        setAtentionSchedule((prevSchedule) => {
            const newSchedule = [...prevSchedule, {}]; // Agrega un nuevo horario vacío
            return newSchedule;
        });
    };

    return (
        <form className="form-register" onSubmit={(e) => saveDataTeacher(e, valuesTeacher)}>
            <TitleEISC subtitle={"Registro de datos de Docente"} />
            <div style={{
                display: section === 1 ? 'block' : 'none'
            }} >
                <section className='section-form-register' style={{ marginBottom: "2rem" }}>
                    <div>
                        <label className='form-label' htmlFor="nicknameTeacher">
                            Nickname
                            <span className='required-value'>
                                *
                            </span>
                        </label>
                        <input
                            id="nicknameTeacher"
                            name='nicknameTeacher'
                            type="text"
                            placeholder="Escribe tu nickname"
                            className='form-input'
                            required={true}
                            onChange={e => setValuesTeacher({ ...valuesTeacher, nickname: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='form-label' htmlFor="biography">
                            Biografía
                        </label>
                        <input
                            id="biography"
                            name='biography'
                            type="text"
                            placeholder="Describete quién eres"
                            className='form-input'
                            onChange={e => setValuesTeacher({ ...valuesTeacher, biography: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='form-label' htmlFor="moreInfoTeacher">
                            Más información
                        </label>
                        <input
                            id="moreInfoTeacher"
                            name='moreInfoTeacher'
                            type="text"
                            placeholder="Ingresa más información de interés"
                            className='form-input'
                            onChange={e => setValuesTeacher({ ...valuesTeacher, more_info: e.target.value })}
                        />
                    </div>
                </section>
                <button
                    type="button"
                    role='button'
                    className="button"
                    onClick={() => setSection(2)}
                >
                    Siguiente
                </button>
            </div>
            <div style={{
                display: section === 2 ? 'block' : 'none'
            }}>
                <section className='section-form-register'>
                    <span className="form-label">
                        Ingrese sus horarios de atención:
                    </span>
                    <div className='atention-schedule'>
                        <div>
                            {atentionSchedule.map((atention, index) => {
                                return <AtentionSchedule key={index} />;
                            })}
                        </div>

                        <button
                            type="button"
                            role="button"
                            className="button-add-new-atention-schedule"
                            aria-label='Agregar horario de atención'
                            title="Agregar un nuevo horario de atención"
                            onClick={handleAddNewAtentionSchedule}
                        >
                            +
                        </button>
                    </div>
                </section>
                <div>
                    <button
                        type="button"
                        role="button"
                        className="button"
                        onClick={() => setSection(1)}
                    >
                        Anterior
                    </button>
                    <button
                        type="submit"
                        className="button-submit"
                    >
                        Guardar datos
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FormTeacher;