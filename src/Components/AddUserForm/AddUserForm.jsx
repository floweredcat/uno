import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/Users/Thunks/addUser";
import { FormElem } from "../FormElem/FormElem";
import { InputText } from "../../UI/InputText/InputText";
import { InputPhone } from "../../UI/InputPhone/InputPhone";
import { InputPass } from "../../UI/InputPass/InputPass";
import { InputRadio } from "../../UI/InputRadio/InputRadio";
import styles from "./styles.module.css";
import { isEmpty, isEmail, isMobilePhone, isAlpha } from "validator";

const ROLES = {
  admin: { content: "admin", id: 1 },
  user: { content: "user", id: 3 },
  master: { content: "master", id: 2 },
};

export const AddUserForm = ({ togglePopup }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState(ROLES.user.id);
  const initialValidate = {
    validate: undefined,
    errorMessage: " ",
  };
  const [validate, setValidate] = useState(initialValidate);
  useEffect(() => {
    if (validate.errorMessage.length < 5 && phone.length > 8) {
      dispatch(addUser({ userId, email, role, name, phone, pass }));
      togglePopup();
      resetForm();
    }
  }, [validate.errorMessage]);
  const userId = localStorage.userId;

  const resetForm = () => {
    setCity("");
    setEmail("");
    setName("");
    setPass("");
    setPhone("");
    setRole(ROLES.user.id);
  };
  const handleValidate = () => {
    if (
      isEmpty(email) ||
      isEmpty(phone) ||
      isEmpty(city) ||
      isEmpty(pass) ||
      isEmpty(name)
    ) {
      setValidate({
        isValid: false,
        errorMessage: "Пожалуйста, заполните все поля",
      });
    } else if (!isEmail(email)) {
      setValidate({
        isValid: false,
        errorMessage: "Неверный формат почты",
      });
    } else if (
      !isMobilePhone(phone) ||
      phone.length < 10 ||
      phone.length > 14
    ) {
      setValidate({
        isValid: false,
        errorMessage: "Неверный номер телефона",
      });
    } else setValidate({ isValid: true, errorMessage: "   " });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleValidate();
  };

  return (
    <FormElem
      title={"Добавление пользователя"}
      onSubmit={onSubmit}>
      <InputText
        value={name}
        label={"Наименование"}
        setValue={setName}
      />
      <InputText
        value={email}
        label={"email"}
        setValue={setEmail}
      />
      <InputPhone
        value={phone}
        label={"Телефон"}
        setValue={setPhone}
      />
      <InputText
        value={city}
        label={"Город"}
        setValue={setCity}
      />
      <InputPass
        value={pass}
        label={"Пароль"}
        setValue={setPass}
      />
      <span className={styles.radios_label}>Выберите роль:</span>
      <div className={styles.radios_container}>
        <InputRadio
          label={ROLES.user.content}
          value={ROLES.user.id}
          checked={role === ROLES.user.id}
          setValue={setRole}
        />
        <InputRadio
          label={ROLES.master.content}
          value={ROLES.master.id}
          checked={role === ROLES.master.id}
          setValue={setRole}
        />
        <InputRadio
          label={ROLES.admin.content}
          value={ROLES.admin.id}
          checked={role === ROLES.admin.id}
          setValue={setRole}
        />
      </div>
      <span className={styles.errorMessage}>{validate.errorMessage}</span>
      <button
        type="submit"
        className={classNames(styles.button, styles.form_submit)}>
        Добавить ползователя
      </button>
    </FormElem>
  );
};
