import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ROLES } from "../../constants/Fixtires";
import { addUser } from "../../store/Users/Thunks/addUser";
import styles from "./styles.module.css";


export const AddPopup = ({ toggleAddPopup }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState(ROLES.user.id);  
  const initialValidate = {
    validate: undefined,
    errorMessage: ' ',
  }
  const [validate, setValidate] = useState(initialValidate);
  useEffect(() => {
    if (validate.errorMessage.length < 5 && phone.length > 8) {
      dispatch(addUser({ userId, email, role, name, phone, pass }));
      toggleAddPopup();
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
    let lastAtPos = email.lastIndexOf("@");
    let lastDotPos = email.lastIndexOf(".");
    if (!city.length || !email.length || !name.length || !pass.length || !phone.length) {
      setValidate({ isValid: false, errorMessage: "Пожалуйста, заполните все поля" });
    } else if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf("@@") === -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
      setValidate({ isValid: false, errorMessage: "Неверный формат почты" });
    } else if (
      !phone.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    ) {
      setValidate({ isValid: false, errorMessage: "Длинна номер телефона должна быть не менее 10 символов" });
    } else {
      setValidate({ isValid: true, errorMessage: "   " });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleValidate();
  };

  return (
    <div className={styles.popup_wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.title}>Добавление пользователя</h2>
        <button
          type="button"
          className={classNames(styles.button, styles.popup_closeButton)}
          onClick={() => toggleAddPopup()}
        />
        <div className={styles.input_container}>
          <input
            autoComplete="new-password"
            id="name"
            type="text"
            className={styles.form_input}
            placeholder=" "
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="name" className={styles.form_label}>
            Наименование
          </label>
        </div>
        <div className={styles.input_container}>
          <input
            autoComplete="new-password"
            id="email"
            type="text"
            className={styles.form_input}
            placeholder=" "
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="email" className={styles.form_label}>
            Email
          </label>
        </div>
        <div className={styles.input_container}>
          <input
            autoComplete="new-password"
            id="phone"
            type="text"
            className={styles.form_input}
            placeholder=" "
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <label htmlFor="phone" className={styles.form_label}>
            Телефон
          </label>
        </div>
        <div className={styles.input_container}>
          <input
            autoComplete="new-password"
            id="city"
            type="text"
            className={styles.form_input}
            placeholder=" "
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <label htmlFor="city" className={styles.form_label}>
            Город
          </label>
        </div>
        <div className={styles.input_container}>
          <input
            autoComplete="new-password"
            id="password"
            type="password"
            className={styles.form_input}
            placeholder=" "
            value={pass}
            onChange={(event) => setPass(event.target.value)}
          />
          <label htmlFor="password" className={styles.form_label}>
            Пароль
          </label>
        </div>
        <span className={styles.radios_label}>Выберите роль:</span>
        <div className={styles.radios_container}>
          <div className={styles.radio_container}>
            <input
              className={styles.radio}
              type="radio"
              value={ROLES.user.content}
              onChange={() => setRole(ROLES.user.id)}
              checked={role === ROLES.user.id}
            />
            {ROLES.user.content}
            <label className={styles.label_radio}></label>
          </div>
          <div className={styles.radio_container}>
            <input
              className={styles.radio}
              type="radio"
              value={ROLES.master.content}
              onChange={() => setRole(ROLES.master.id)}
              checked={role === ROLES.master.id}
            />
            {ROLES.master.content}
            <label className={styles.label_radio}></label>
          </div>
          <div className={styles.radio_container}>
            <input
              className={styles.radio}
              type="radio"
              value={ROLES.admin.content}
              onChange={() => setRole(ROLES.admin.id)}
              checked={role === ROLES.admin.id}
            />
            {ROLES.admin.content}
            <label className={styles.label_radio}></label>
          </div>
        </div>
        <span className={styles.errorMessage}>{validate.errorMessage}</span>
        <button
          type="submit"
          className={classNames(styles.button, styles.form_submit)}
        >
          Добавить ползователя
        </button>
      </form>
    </div>
  );
};
