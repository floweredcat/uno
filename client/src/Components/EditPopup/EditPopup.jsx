import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../store/Auth/selectors";
import { selectUserDataById } from "../../store/Users/selectors";
import { editUser } from "../../store/Users/Thunks/editUser";
import styles from "./styles.module.css";

export const EditPopup = ({ togglePopup, id, resetSelectedRow }) => {
  const userId = useSelector((state) => selectUserId(state));
  const userData = useSelector((state) => selectUserDataById(state, {id}))
  const dispatch = useDispatch();
  const [email, setEmail] = useState(userData?.EMAIL ? userData.EMAIL : '');
  const [name, setName] = useState(userData?.NAME ? userData.NAME : '');
  const [phone, setPhone] = useState(userData?.PHONE ? userData.PHONE : '');

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('YaAAAAAAaye');
    dispatch(editUser({id, email, name, userId}))
    resetSelectedRow();
    resetForm();
  }

  const resetForm = () => {
    setEmail("");
    setName("");
    setPhone("");
  };
  return (
    <div className={styles.popup_wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.title}>Добавление пользователя</h2>
        <button
          type="button"
          className={classNames(styles.button, styles.popup_closeButton)}
          onClick={() => togglePopup()}
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
