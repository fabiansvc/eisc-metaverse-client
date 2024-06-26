import React, { useEffect, useRef } from "react";
import { useUser } from "../../../../../../../context/UserContext";
import { editUser } from "../../../../../../../db/user-collection";
import AtentionSchedule from "../../../../../../Register/FormTeacher/AtentionSchedule/AtentionSchedule";

/**
 * Component for editing teacher's data.
 * @returns {JSX.Element} The JSX.Element for editing teacher's data.
 */
export default function FormEditTeacher () {
  const nicknameInputRef = useRef(null);
  const biographyInputRef = useRef(null);
  const moreInfoInputRef = useRef(null);
  const { user, setUser } = useUser();

  /**
   * Function to handle editing teacher's data.
   * @param {Event} e - The event object.
   * @param {Object} user - The user object.
   */
  const handleEditTeacherData = async (e, user) => {
    e.preventDefault();
    await editUser(user.email, user)
      .then(() => {
        alert("Datos actualizados correctamente");
      })
      .catch((error) => {
        console.log(error, "Error al actualizar los datos");
      });
  };

  /**
   * Function to add a new attention schedule.
   */
  const handleAddNewAttentionSchedule = () => {
    setUser({
      ...user,
      attention_schedule: [
        ...user.attention_schedule,
        {
          day: "",
          start: "",
          end: "",
        },
      ],
    });
  };

  useEffect(() => {
    nicknameInputRef.current.value = user.nickname;
    biographyInputRef.current.value = user.biography ? user.biography : "";
    moreInfoInputRef.current.value = user.more_info ? user.more_info : "";
  }, [user.nickname, user.biography, user.more_info]);

  return (
    <div className="container-form-edit-teacher">
      <div className="card-form-edit">
        <form
          className="form-edit"
          onSubmit={(e) => handleEditTeacherData(e, user)}
        >
          <section className="section-form">
            <div className="container-icon-user">
              <img className="icon-user" src={user.avatarPng} alt="user" />
            </div>
            <div>
              <label className="form-label" htmlFor="nicknameTeacher">
                Nickname
                <span className="required-value">*</span>
              </label>
              <input
                ref={nicknameInputRef}
                id="nicknameTeacher"
                name="nicknameTeacher"
                type="text"
                className="form-input"
                required
                onChange={(e) => setUser({ ...user, nickname: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="biography">
                Biografía
              </label>
              <input
                ref={biographyInputRef}
                id="biography"
                name="biography"
                type="text"
                className="form-input"
                placeholder="Describe brevemente quién eres"
                onChange={(e) =>
                  setUser({ ...user, biography: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form-label" htmlFor="moreInfoTeacher">
                Más información
              </label>
              <input
                ref={moreInfoInputRef}
                id="moreInfoTeacher"
                name="moreInfoTeacher"
                type="text"
                className="form-input"
                placeholder="Ingresa más información de interés"
                onChange={(e) =>
                  setUser({ ...user, more_info: e.target.value })
                }
              />
            </div>
          </section>
          <div className="atention-schedule-container">
            <div className="atention-schedule">
              <span className="form-label">
                Ingrese sus horarios de atención:
              </span>
              {user.attention_schedule.map((atention, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <AtentionSchedule
                    valuesTeacher={user}
                    setValuesTeacher={setUser}
                    count={index}
                  />
                  <button
                    type="button"
                    className="button-delete-atention-schedule"
                    onClick={() => {
                      const newAttentionSchedule =
                        user.attention_schedule.filter(
                          (atention, i) => i !== index
                        );
                      setUser({
                        ...user,
                        attention_schedule: newAttentionSchedule,
                      });
                    }}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="button-add-new-atention-schedule"
              aria-label="Agregar horario de atención"
              title="Agregar un nuevo horario de atención"
              onClick={handleAddNewAttentionSchedule}
            >
              +
            </button>
          </div>
          <button type="submit" className="button-edit">
            Editar datos
          </button>
        </form>
      </div>
    </div>
  );
};