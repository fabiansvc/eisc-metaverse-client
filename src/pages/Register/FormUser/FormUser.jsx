import "./form-user.css";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../db/UsersCollection";
import { useEffect, useState } from "react";
import TitleEISC from "../../Components/TitleEISC/TitleEISC";
import { useAuth } from "../../../context/authContext";

const FormUser = () => {
  const auth = useAuth();
  const { displayName, email } = auth.userLogged;
  const navigate = useNavigate();
  const [valuesUser, setValuesUser] = useState({});

  useEffect(() => {
    setValuesUser({
      email: email,
      name: displayName,
      isTeacher: false,
    });
  }, [email, displayName]);

  const saveDataUser = async (e, valuesUser) => {
    e.preventDefault();
    const newUser = valuesUser;
    const result = await createUser(newUser);
    result.success
      ? navigate("/create-avatar", { state: "user" })
      : alert("Error al guardar los datos");
  };

  return (
    <form
      className="form-register"
      onSubmit={(e) => saveDataUser(e, valuesUser)}
    >
      <TitleEISC subtitle={"Registro de datos de usuario"} />
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
