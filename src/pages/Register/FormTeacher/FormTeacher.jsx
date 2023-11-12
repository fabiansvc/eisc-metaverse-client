import { useNavigate } from "react-router-dom";
import { createUser } from "../../../db/user-collection";
import { useEffect, useState } from "react";
import AtentionSchedule from "./AtentionSchedule/AtentionSchedule";
import TitleEISC from "../../Components/TitleEISC/TitleEISC";
import { useAuth } from "../../../context/AuthContext";

const FormTeacher = () => {
  const auth = useAuth();
  const { displayName, email, photoURL } = auth.userLogged;
  const navigate = useNavigate();
  const [section, setSection] = useState(1);
  const [valuesTeacher, setValuesTeacher] = useState({
    email: email,
    name: displayName,
    isTeacher: true,
    photoURL: photoURL,
    attention_schedule: [
      {
        day: "",
        start: "",
        end: "",
      },
    ],
    firstTime: true,
  });

  const saveDataTeacher = async (e, valuesTeacher) => {
    e.preventDefault();
    const newUser = valuesTeacher;
    const result = await createUser(newUser);
    result.success
      ? navigate("/create-avatar", { state: "user" })
      : alert("Error al guardar los datos");
  };

  const handleAddNewAtentionSchedule = () => {
    setValuesTeacher({
      ...valuesTeacher,
      attention_schedule: [
        ...valuesTeacher.attention_schedule,
        {
          day: "",
          start: "",
          end: "",
        },
      ],
    });
  };

  return (
    <form
      className="form-register"
      onSubmit={(e) => saveDataTeacher(e, valuesTeacher)}
    >
      <TitleEISC subtitle={"Registro de datos de Docente"} />
      <div
        style={{
          display: section === 1 ? "block" : "none",
        }}
      >
        <section className="section-form">
          <div>
            <label className="form-label" htmlFor="nicknameTeacher">
              Nickname
              <span className="required-value">*</span>
            </label>
            <input
              id="nicknameTeacher"
              name="nicknameTeacher"
              type="text"
              placeholder="Escribe tu nickname"
              className="form-input"
              required={true}
              onChange={(e) =>
                setValuesTeacher({ ...valuesTeacher, nickname: e.target.value })
              }
            />
          </div>
          <div>
            <label className="form-label" htmlFor="biography">
              Biografía
            </label>
            <input
              id="biography"
              name="biography"
              type="text"
              placeholder="Describete quién eres"
              className="form-input"
              onChange={(e) =>
                setValuesTeacher({
                  ...valuesTeacher,
                  biography: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="form-label" htmlFor="moreInfoTeacher">
              Más información
            </label>
            <input
              id="moreInfoTeacher"
              name="moreInfoTeacher"
              type="text"
              placeholder="Ingresa más información de interés"
              className="form-input"
              onChange={(e) =>
                setValuesTeacher({
                  ...valuesTeacher,
                  more_info: e.target.value,
                })
              }
            />
          </div>
        </section>
        <button
          type="button"
          role="button"
          className="button"
          onClick={() => setSection(2)}
        >
          Siguiente
        </button>
      </div>
      <div
        style={{
          display: section === 2 ? "block" : "none",
        }}
      >

        
        <div className="atention-schedule-container">
          <div className="atention-schedule">
          <span className="form-label">Ingrese sus horarios de atención:</span>
            {valuesTeacher.attention_schedule.map((atention, index) => {
              return (
                <AtentionSchedule
                  key={index}
                  valuesTeacher={valuesTeacher}
                  count={index}
                />
              );
            })}
          </div>
          <button
            type="button"
            role="button"
            className="button-add-new-atention-schedule"
            aria-label="Agregar horario de atención"
            title="Agregar un nuevo horario de atención"
            onClick={handleAddNewAtentionSchedule}
          >
            +
          </button>
        </div>
        <div className="container-button">
          <button
            type="button"
            role="button"
            className="button"
            onClick={() => setSection(1)}
          >
            Anterior
          </button>
          <button type="submit" className="button-submit">
            Guardar datos
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormTeacher;
