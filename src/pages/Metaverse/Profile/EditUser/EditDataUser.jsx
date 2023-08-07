import "./edit-data-user.css"
import { useEffect, useState } from "react";
import { getTeacher } from "../../../../db/TeachersCollection";
import FormEditUser from "./FormEditUser/FormEditUser";
import FormEditTeacher from "./FormEditTeacher/FormEditTeacher";
import { useUser } from "../../../../context/userContext";

const EditDataUser = () => {
    const { user } = useUser()
    const [flagTypeForm, setFlagTypeForm] = useState("")

    const isTeacher = async () => {
        const result = await getTeacher(user.email)
        result.success ? setFlagTypeForm("teacher") : setFlagTypeForm("user")
    }

    useEffect(() => {
        isTeacher()
    }, [user.email])

    return (
        <div className="container-edit-data-user">
            {flagTypeForm === "teacher" && <FormEditTeacher />}
            {flagTypeForm === "user" && <FormEditUser />}
        </div>
    )
}

export default EditDataUser;