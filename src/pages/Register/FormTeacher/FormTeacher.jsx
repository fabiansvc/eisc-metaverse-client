import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../db/UsersCollection';
import './stylesFormTeacher.css'
import { useState } from 'react';
import TitleEISC from '../Components/TitleEISC';
import AtentionSchedule from '../Components/AtentionSchedule/AtentionSchedule';

const FormTeacher = ({ displayName, email }) => {
    const navigate = useNavigate();
    const [section, setSection] = useState(1);

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

    const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

    const saveDataTeacher = async (e, valuesTeacher) => {
        e.preventDefault()
        const newUser = valuesTeacher;
        await createUser(newUser).then((docRef) => {
            // console.log("Document written with ID: ", docRef.id);
            navigate('/create-avatar')
        });
    };

    return <>
        <div className="cardFormTeacher">
            <form className="formTeacher" onSubmit={(e) => saveDataTeacher(e, valuesTeacher)}>
                <TitleEISC title={"Registro de datos de Docente"} />
                {section === 1 && <section className='Section1'>
                    <div>
                        <label htmlFor="labelNicknameTeacher">
                            Nickname
                        </label>
                        <label className='RequiredValue'>
                            *
                        </label>
                        <input
                            id="inputNicknameTeacher"
                            name='inputNicknameTeacher'
                            type="text"
                            placeholder="Escribe tu nickname"
                            required={true}
                            onChange={e => setValuesTeacher({ ...valuesTeacher, nickname: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="labelNicknameTeacher">
                            Biografía
                        </label>
                        <label className='RequiredValue'>
                            *
                        </label>
                        <input
                            id="inputBiographyTeacher"
                            name='inputNicknameTeacher'
                            type="text"
                            placeholder="Describete quién eres"
                            required={true}
                            onChange={e => setValuesTeacher({ ...valuesTeacher, biography: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="labelMoreInfoTeacher">
                            Más información
                        </label>
                        <input id="inputMoreInfoTeacher" name='inputMoreInfoTeacher' type="text" placeholder="Ingresa más información de interés" onChange={e => setValuesTeacher({ ...valuesTeacher, more_info: e.target.value })} />
                    </div>
                    <button
                        type="button"
                        className="buttonNext"
                        disabled={Object.values(valuesTeacher).map(value => value === '').every(value => value) ? true : false}
                        onClick={() => setSection(2)}
                    >
                        Siguiente
                    </button>
                </section>}
                {section === 2 && <section className='Section2'>
                    <label className="LabelAtentionSchedule" htmlFor="LabelAtentionSchedule">
                        Horarios de atención:
                    </label>
                    {
                        DAYS.map((day, index) => {
                            return <AtentionSchedule key={index} valuesTeacher={valuesTeacher} setValuesTeacher={setValuesTeacher} day={day} />
                        })
                    }

                    <button
                        type="button"
                        className="buttonBack"
                        onClick={() => setSection(1)}
                    >
                        Anterior
                    </button>
                    <button
                        type="submit"
                        className="buttonSaveDataTeacher"
                    >
                        Guardar datos
                    </button>
                </section>}
            </form>
        </div>
    </>
}

export default FormTeacher;