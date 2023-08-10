import "./form-edit-user.css";
import { useState } from "react";
import { useUser } from "../../../../../context/userContext";
import { editUser } from "../../../../../db/UsersCollection";

const FormEditUser = () => {
  const { user } = useUser();
  const [valuesUser, setValuesUser] = useState({ ...user });

  const editDataUser = async (e, valuesUser) => {
    e.preventDefault();
    const result = await editUser(user.email, valuesUser);
    console.log(result);
  };

  return (
    <div className="container-form-edit-user">
      <div className="card-form-edit">
        <form
          className="form-edit"
          onSubmit={(e) => editDataUser(e, valuesUser)}
        >
          <section className="section-form-edit">
            <div>
              <label className="form-label" htmlFor="nicknameUser">
                Nickname
                <span className="required-value">*</span>
              </label>
              <input
                id="nicknameUser"
                name="nicknameUser"
                type="text"
                className="form-input"
                value={valuesUser.nickname}
                required={true}
                onChange={(e) =>
                  setValuesUser({ ...valuesUser, nickname: e.target.value })
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
                value={valuesUser.biography}
                onChange={(e) =>
                  setValuesUser({ ...valuesUser, biography: e.target.value })
                }
              />
            </div>
          </section>
          <button
            type="submit"
            className="button-submit"
            disabled={
              Object.values(valuesUser)
                .map((value) => value === "")
                .every((value) => value)
                ? true
                : false
            }
          >
            Editar datos
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEditUser;
