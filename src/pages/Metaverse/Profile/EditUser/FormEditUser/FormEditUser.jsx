import "./form-edit-user.css";
import { useState } from "react";
import { useUser } from "../../../../../context/userContext";

const FormEditUser = () => {
  const { user } = useUser();
  const [valuesUser, setValuesUser] = useState({
    nickname: user.data.nickname,
    biography: user.data.biography,   
  });

  const editDataUser = (e, valuesUser) => {
    e.preventDefault();
  };

  return (
    <div className="container-form-edit-user">
      <form
        className="form-register"
        onSubmit={(e) => editDataUser(e, valuesUser)}
      >
        <section className="section-form-register">
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
  );
};

export default FormEditUser;
