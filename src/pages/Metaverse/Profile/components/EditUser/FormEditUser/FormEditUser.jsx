import { useEffect, useRef } from "react";
import { useUser } from "../../../../../../context/UserContext";
import { editUser } from "../../../../../../db/user-collection";

const FormEditUser = () => {
  const { user, setUser } = useUser();
  const nicknameInputRef = useRef(null);
  const biographyInputRef = useRef(null);
  const { type } = user;

  const editDataUser = async (e, user) => {
    e.preventDefault();

    await editUser(user.email, user)
      .then(() => {
        alert("Datos actualizados correctamente");
      }).catch((error) => {
        console.log(error, "Error al actualizar los datos");
      });
  };

  const editDataGuest = async (e, user) => {
    e.preventDefault();
    window.localStorage.setItem("user", JSON.stringify(user));
    alert("Datos actualizados correctamente");
  }

  const onHandleEdit = async (e, user) => {
    e.preventDefault();
    type !== "guest" ? editDataUser(e, user) : editDataGuest(e, user);
  };

  useEffect(() => {
    nicknameInputRef.current.value = user.nickname;
    biographyInputRef.current.value = user.biography ? user.biography : "";
  }, [nicknameInputRef, biographyInputRef]);

  return (
    <div className="container-form-edit-user">
      <div className="card-form-edit">
        <form className="form-edit" onSubmit={(e) => onHandleEdit(e, user)}>
          <section className="section-form">
            <div className="container-icon-user">
              <img className="icon-user" src={user.avatarPng} alt="user" />
            </div>
            <div>
              <label className="form-label" htmlFor="nicknameUser">
                Nickname
                <span className="required-value">*</span>
              </label>
              <input
                ref={nicknameInputRef}
                id="nicknameUser"
                name="nicknameUser"
                type="text"
                className="form-input"
                required={true}
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
          </section>
          <button
            type="submit"
            className="button-edit"
            disabled={
              Object.values(user)
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
