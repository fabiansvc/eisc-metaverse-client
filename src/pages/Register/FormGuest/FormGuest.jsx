import { useState } from "react";
import TitleEISC from "../../Components/TitleEISC/TitleEISC";

const FormGuest = () => {
    const [valuesGuest, setValuesGuest] = useState({});

    const saveDataGuest = async (e, valuesGuest) => {
        e.preventDefault();

    };

    return (
        <form
            className="form-register"
            onSubmit={(e) => saveDataGuest(e, valuesGuest)}
        >
            <TitleEISC subtitle={"Registro de datos de invitado"} />
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
            </section>
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
        </form>
    )
}

export default FormGuest;