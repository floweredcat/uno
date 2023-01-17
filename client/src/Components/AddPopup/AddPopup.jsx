import classNames from "classnames";
import { useEffect, useState } from "react";
import { addUser } from "../../store/Users/Thunks/addUser";
import styles from "./styles.module.css";
const roleVars = {
  admin: { content: "admin", id: 1 },
  user: { content: "user", id: 3 },
  master: { content: "master", id: 2 },
};

export const AddPopup = ({ toggleAddPopup }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState(roleVars.user.id);
  const [isValidate, setIsValidate] = useState();
  useEffect(() => {
    if (isValidate) {
      addUser({ userId, email, role, name, phone, pass });
      toggleAddPopup();
      resetForm();
    }
  }, [isValidate]);
  const userId = localStorage.userId;

  const resetForm = () => {
    setCity("");
    setEmail("");
    setName("");
    setPass("");
    setPhone("");
    setRole(roleVars.user.id);
  };
  const handleValidate = () => {
    let lastAtPos = email.lastIndexOf("@");
    let lastDotPos = email.lastIndexOf(".");
    if (!email || !phone || !name || !city || !pass) {
      setIsValidate(false);
      return;
    } else if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf("@@") === -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
      setIsValidate(false);
    } else if (
      city.length < 3 &&
      name.length < 3 &&
      !phone.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/) &&
      10 >= phone.length >= 11
    ) {
      console.log("!!");
      setIsValidate(false);
    } else {
      setIsValidate(true);
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
            required
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
            required
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
            required
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
            required
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
            required
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
              value={roleVars.user.content}
              onChange={() => setRole(roleVars.user.id)}
              checked={role === roleVars.user.id}
            />
            {roleVars.user.content}
            <label className={styles.label_radio}></label>
          </div>
          <div className={styles.radio_container}>
            <input
              className={styles.radio}
              type="radio"
              value={roleVars.master.content}
              onChange={() => setRole(roleVars.master.id)}
              checked={role === roleVars.master.id}
            />
            {roleVars.master.content}
            <label className={styles.label_radio}></label>
          </div>
          <div className={styles.radio_container}>
            <input
              className={styles.radio}
              type="radio"
              value={roleVars.admin.content}
              onChange={() => setRole(roleVars.admin.id)}
              checked={role === roleVars.admin.id}
            />
            {roleVars.admin.content}
            <label className={styles.label_radio}></label>
          </div>
        </div>
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
