import { useNavigate } from "react-router-dom";
import { createUser } from "../../../db/user-collection";
import { useState } from "react";
import AtentionSchedule from "./AtentionSchedule/AtentionSchedule";
import { useAuth } from "../../../context/AuthContext";
import TitleEISC from "../../../components/TitleEISC/TitleEISC";

/**
 * FormTeacher component
 * @returns {JSX.Element} FormTeacher component
 */
export default function FormTeacher() {
  const auth = useAuth();
  const { displayName, email, photoURL } = auth.userLogged;
  const navigate = useNavigate();
  const [section, setSection] = useState(1);
  const [valuesTeacher, setValuesTeacher] = useState({
    email: email,
    name: displayName,
    photoURL: photoURL,
    nickname: "",
    biography: "",
    avatarUrl: "",
    avatarPng: "",
    isTeacher: true,
    firstTime: true,
    attention_schedule: [
      {
        day: "",
        start: "",
        end: "",
      },
    ],
  });

  /**
   * Saves teacher data
   * @param {Event} e - Form submit event
   * @param {Object} valuesTeacher - Teacher data values
   */
  const saveDataTeacher = async (e, valuesTeacher) => {
    e.preventDefault();
    const newUser = valuesTeacher;
    const result = await createUser(newUser);
    result.success
      ? navigate("/create-avatar", { state: "user" })
      : alert("Error al guardar los datos");
  };

  /**
   * Handles adding a new attention schedule
   */
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
      <TitleEISC />
      <h3
          style={{
            textAlign: "center",
          }}
        >
          Registro datos docente
        </h3>
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
          <button
            type="button"
            role="button"
            className="button"
            onClick={() => setSection(2)}
          >
            Siguiente
          </button>
        </section>
      </div>
      <div
        style={{
          display: section === 2 ? "block" : "none",
        }}
      >
        <span className="form-label">Ingrese sus horarios de atención:</span>
        <div className="atention-schedule-container">
          <div className="atention-schedule">
            {valuesTeacher.attention_schedule.map((atention, index) => {
              return (
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <AtentionSchedule
                    key={index}
                    valuesTeacher={valuesTeacher}
                    setValuesTeacher={setValuesTeacher}
                    count={index}
                  />
                  <button
                    type="button"
                    className="button-delete-atention-schedule"
                    onClick={() => {
                      const newAttentionSchedule =
                        valuesTeacher.attention_schedule.filter(
                          (atention, i) => i !== index
                        );
                      setValuesTeacher({
                        ...valuesTeacher,
                        attention_schedule: newAttentionSchedule,
                      });
                    }}
                  >
                    -
                  </button>
                </div>
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
}
