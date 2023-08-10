import "./form-edit-teacher.css";
import { useState } from "react";
import { useUser } from "../../../../../context/userContext";
import { editUser } from "../../../../../db/UsersCollection";

const FormEditTeacher = () => {
  const { user } = useUser();
  const [valuesTeacher, setValuesTeacher] = useState({ ...user });

  const editDataTeacher = async (e, valuesTeacher) => {
    e.preventDefault();
    const result = await editUser(user.email, valuesTeacher);
    console.log(result);
  };

  return (
    <div className="container-form-edit-teacher">
      <div className="card-form-edit">
        <form
          className="form-edit"
          onSubmit={(e) => editDataTeacher(e, valuesTeacher)}
        >
          <section className="section-form-edit">
            <div>
              <label className="form-label" htmlFor="nicknameTeacher">
                Nickname
                <span className="required-value">*</span>
              </label>
              <input
                id="nicknameTeacher"
                name="nicknameTeacher"
                type="text"
                className="form-input"
                value={valuesTeacher.nickname}
                required={true}
                onChange={(e) =>
                  setValuesTeacher({
                    ...valuesTeacher,
                    nickname: e.target.value,
                  })
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
                className="form-input"
                value={valuesTeacher.biography}
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
                className="form-input"
                value={valuesTeacher.more_info}
                onChange={(e) =>
                  setValuesTeacher({
                    ...valuesTeacher,
                    more_info: e.target.value,
                  })
                }
              />
            </div>
          </section>
          <button type="submit" className="button-submit">
            Guardar datos
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEditTeacher;
