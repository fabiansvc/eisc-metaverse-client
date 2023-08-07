import "./form-edit-teacher.css"
import { useState } from "react";
import { useUser } from "../../../../../context/userContext";
import { editUser } from "../../../../../db/UsersCollection";
import AtentionSchedule from "../../../../Components/AtentionSchedule/AtentionSchedule";
import TitleEISC from "../../../../Components/TitleEISC/TitleEISC";

const FormEditTeacher = () => {
    const { user } = useUser()
    const [section, setSection] = useState(1);
    const [atentionSchedule, setAtentionSchedule] = useState([{}]);
    const [valuesTeacher, setValuesTeacher] = useState({});

    const editDataTeacher = async (e, valuesTeacher) => {
        e.preventDefault()
        const result = await editUser(user.email, valuesTeacher)
        result.success ? alert("Datos editados") : alert("Error al guardar los datos")
    }

    const handleAddNewAtentionSchedule = () => {
        setValuesTeacher((prevState) => ({
            ...prevState,
            attention_schedule: [...prevState.attention_schedule, {
                day: '',
                start: '',
                end: ''
            }]
        }));

        setAtentionSchedule((prevSchedule) => {
            const newSchedule = [...prevSchedule, {}]; // Agrega un nuevo horario vacío
            return newSchedule;
        });
    };

    return (
        <div className="container-form-edit-teacher">


            <form className="form-register" onSubmit={(e) => editDataTeacher(e, valuesTeacher)}>
                <TitleEISC subtitle={"Datos de Docente"} />
                <div style={{
                    display: section === 1 ? 'block' : 'none'
                }} >
                    <section className='section-form-register'>
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
                                className='form-input'
                                value={user.data.nickname}
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
                                className='form-input'
                                value={user.data.biography}
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
                                className='form-input'
                                value={user.data.more_info}
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
                                    return <AtentionSchedule key={index + 1} valuesTeacher={valuesTeacher} setValuesTeacher={setValuesTeacher} count={index} />;
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
        </div>
    )
}

export default FormEditTeacher;