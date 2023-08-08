import "./edit-data-user.css";
import FormEditUser from "./FormEditUser/FormEditUser";
import FormEditTeacher from "./FormEditTeacher/FormEditTeacher";
import { useUser } from "../../../../context/userContext";

const EditDataUser = () => {
  const { user } = useUser();
  const isTeacher = user.data.isTeacher;

  return (
    <div className="container-edit-data-user">
      {isTeacher && <FormEditTeacher />}
      {!isTeacher && <FormEditUser />}
    </div>
  );
};

export default EditDataUser;
