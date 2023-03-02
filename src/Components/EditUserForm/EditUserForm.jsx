import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDataById } from "../../store/Users/selectors";
import { editUser } from "../../store/Users/Thunks/editUser";
import { InputPhone } from "../../UI/InputPhone/InputPhone";
import { InputText } from "../../UI/InputText/InputText.tsx";
import { FormElem } from "../FormElem/FormElem";
import styles from "./styles.module.css";

export const EditUserForm = ({ togglePopup, id, resetSelectedRow }) => {
  const userData = useSelector((state) => selectUserDataById(state, { id }));
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: userData?.EMAIL || "",
    phone: userData?.NAME || "",
    name: userData?.PHONE || "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editUser({
        ...form,
        idAccess: localStorage.userIdAccess / 1,
        id,
      })
    );
    resetSelectedRow();
    togglePopup();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <FormElem onSubmit={onSubmit} title={"Редактирование пользователя"}>
      <InputText
        name={"name"}
        value={form.name}
        setValue={handleChange}
        label={"Наименование"}
      />
      <InputText
        name={"email"}
        value={form.email}
        setValue={handleChange}
        label={"Email"}
      />
      <InputPhone
        name={"phone"}
        value={form.phone}
        setValue={handleChange}
        label={"Телефон"}
      />
      <button
        type="submit"
        className={classNames(styles.button, styles.form_submit)}
      >
        Изменить данные
      </button>
    </FormElem>
  );
};
