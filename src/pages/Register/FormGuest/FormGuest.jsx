import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleEISC from "../../../components/TitleEISC/TitleEISC";

/**
 * FormGuest component
 * @returns {JSX.Element} FormGuest component
 */
export default function FormGuest () {
  const navigate = useNavigate();
  const [valuesGuest, setValuesGuest] = useState({});

  /**
   * Saves guest data
   * @param {Object} e - Event object
   * @param {Object} valuesGuest - Guest data values
   */
  const saveDataGuest = async (e, valuesGuest) => {
    e.preventDefault();
    window.localStorage.setItem("nickname", valuesGuest.nickname);
    window.localStorage.setItem(
      "biography",
      valuesGuest.biography !== undefined ? valuesGuest.biography : ""
    );
    window.localStorage.setItem("avatarUrl", "");
    window.localStorage.setItem("avatarPng", "");
    window.localStorage.setItem("isTeacher", false);
    window.localStorage.setItem("firstTime", true);
    navigate("/create-avatar", { state: "guest" });
  };

  return (
    <form
      className="form-register"
      onSubmit={(e) => saveDataGuest(e, valuesGuest)}
    >
      <TitleEISC />
      <h3>Registro datos invitado</h3>
      <section className="section-form">
        <div>
          <label className="form-label" htmlFor="nicknameGuest">
            Nickname
            <span className="required-value">*</span>
          </label>
          <input
            id="nicknameGuest"
            name="nicknameGuest"
            type="text"
            placeholder="Escribe tu nickname"
            className="form-input"
            required={true}
            onChange={(e) =>
              setValuesGuest({ ...valuesGuest, nickname: e.target.value })
            }
          />
        </div>
        <div>
          <label className="form-label" htmlFor="biography">
            Biografía
          </label>
          <input
            id="biographyGuest"
            name="biographyGuest"
            type="text"
            placeholder="Describe brevemente quién eres"
            className="form-input"
            onChange={(e) =>
              setValuesGuest({ ...valuesGuest, biography: e.target.value })
            }
          />
        </div>
        <button
        type="submit"
        className="button-submit"
        disabled={
          Object.values(valuesGuest)
            .map((value) => value === "")
            .every((value) => value)
            ? true
            : false
        }
      >
        Guardar datos
      </button>
      </section>

    </form>
  );
};