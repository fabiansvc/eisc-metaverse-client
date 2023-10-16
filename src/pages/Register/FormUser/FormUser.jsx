import { useNavigate } from "react-router-dom";
import { createUser } from "../../../db/user-collection";
import { useEffect, useState } from "react";
import TitleEISC from "../../Components/TitleEISC/TitleEISC";
import { useAuth } from "../../../context/AuthContext";

const FormUser = () => {
  const { userLogged } = useAuth();
  const { displayName, email, photoURL } = userLogged;
  const [valuesUser, setValuesUser] = useState({});

  useEffect(() => {
    setValuesUser({
      email: email,
      name: displayName,
      isTeacher: false,
      photoURL: photoURL,
    });
  }, [email, displayName]);

  const saveDataUser = async (e, valuesUser) => {
    e.preventDefault();
    const newUser = valuesUser;
    const result = await createUser(newUser);
    result.success
      ? useNavigate("/create-avatar", { state: "user" })
      : alert("Error al guardar los datos");
  };

  return (
    <form
      className="form-register"
      onSubmit={(e) => saveDataUser(e, valuesUser)}
    >
      <TitleEISC subtitle={"Registro de datos de usuario"} />
      <section className="section-form">
        <div>
          <label className="form-label" htmlFor="nicknameUser">
            Nickname
            <span className="required-value">*</span>
          </label>
          <input
            id="nicknameUser"
            name="nicknameUser"
            type="text"
            placeholder="Escribe tu nickname"
            className="form-input"
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
            placeholder="Describe brevemente quién eres"
            className="form-input"
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
        Guardar datos
      </button>
    </form>
  );
};

export default FormUser;
