import { useEffect, useRef } from "react";
import { useUser } from "../../../../../context/UserContext";
import { editUser } from "../../../../../db/user-collection";

const FormEditUser = () => {
  const { user, setUser } = useUser();
  const nicknameInputRef = useRef(null);
  const biographyInputRef = useRef(null);

  const editDataUser = async (e, user) => {
    e.preventDefault();
    const result = await editUser(user.email, user);
  };

  useEffect(() => {
    nicknameInputRef.current.value = user.nickname;
    biographyInputRef.current.value = user.biography ? user.biography : "";
  }, [nicknameInputRef, biographyInputRef]);

  return (
    <div className="container-form-edit-user">
      <div className="card-form-edit">
        <form className="form-edit" onSubmit={(e) => editDataUser(e, user)}>
          <section className="section-form">
            <div className="container-icon-user">
              <img className="icon-user" src={user.photoURL} alt="user" />
              <h3>{user.name}</h3>
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
