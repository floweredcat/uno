import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDataById } from "../../store/Users/selectors";
import { editUser } from "../../store/Users/Thunks/editUser";
import { InputPhone } from "../../UI/InputPhone/InputPhone";
import { InputText } from "../../UI/InputText/InputText";
import { FormElem } from "../FormElem/FormElem";
import styles from "./styles.module.css";

export const EditUserForm = ({ togglePopup, id, resetSelectedRow }) => {
  const userData = useSelector((state) => selectUserDataById(state, { id }));
  const dispatch = useDispatch();
  const [email, setEmail] = useState(userData?.EMAIL ? userData.EMAIL : "");
  const [name, setName] = useState(userData?.NAME ? userData.NAME : "");
  const [phone, setPhone] = useState(userData?.PHONE ? userData.PHONE : "");

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editUser({
        idAccess: localStorage.userIdAccess / 1,
        email,
        name,
        phone,
        id,
      })
    );
    resetSelectedRow();
    togglePopup();
  };

  return (
    <FormElem
      onSubmit={onSubmit}
      title={"Редактирование пользователя"}>
      <InputText
        value={name}
        setValue={setName}
        label={"Наименование"}
      />
      <InputText
        value={email}
        setValue={setEmail}
        label={"Email"}
      />
      <InputPhone
        value={phone}
        setValue={setPhone}
        label={"Телефон"}
      />
      <button
        type="submit"
        className={classNames(styles.button, styles.form_submit)}>
        Изменить данные
      </button>
    </FormElem>
  );
};
