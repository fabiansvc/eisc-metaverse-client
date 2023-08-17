import FormEditUser from "./FormEditUser/FormEditUser";
import FormEditTeacher from "./FormEditTeacher/FormEditTeacher";
import { useUser } from "../../../../context/UserContext";
import "./edit-data-user.css";

const EditDataUser = () => {
  const { user } = useUser();
  const isTeacher = user.isTeacher;

  return (
    <div className="container-edit-data-user">
      {isTeacher && <FormEditTeacher />}
      {!isTeacher && <FormEditUser />}
    </div>
  );
};

export default EditDataUser;
