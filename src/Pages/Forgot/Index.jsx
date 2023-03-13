import classNames from "classnames";
import { useState } from "react";
import { FormElem } from "../../Components/FormElem/FormElem";
import { InputText } from "../../UI/InputText/InputText.tsx";
import { Logo } from "../../UI/Logo/Logo";
import styles from "./styles.module.css";
import { isEmail, isEmpty } from "validator";
import { Link } from "react-router-dom";

export function Forgot() {
  const [email, setEmail] = useState("");
  const [validate, setValidate] = useState({
    isValid: true,
    errorMessage: " ",
  });

  function handleValidate() {
    if (isEmpty(email)) {
      setValidate({
        isValid: false,
        errorMessage: "Введите логин для восстановления пароля",
      });
    } else if (!isEmail(email)) {
      setValidate({
        isValid: false,
        errorMessage: "Неверный формат электронной почты",
      });
    } else {
      setValidate({ isValid: true, errorMessage: " " });
    }
  }
  function onSubmit(e) {
    e.preventDefault();
    handleValidate();
  }
  return (
    <section className={styles.forgot}>
      <div className={styles.forgot_wrapper}>
        <Logo />
        <FormElem onSubmit={onSubmit}>
          <InputText label={"Логин"} value={email} setValue={setEmail} />
          <div className={styles.alert}>
            {
              "Запрос на сброс пароля отправлен. Если вы ввели верный логин, Вам на почту придет письмо с инструкцией по восстановлению доступа"
            }
          </div>
          <span className={styles.errorMessage}>{validate.errorMessage}</span>
          <Link to="/" className={styles.back}>
            Назад
          </Link>
          <button
            type="submit"
            className={classNames(styles.button, styles.form_submit)}
          >
            Восстановить пароль
          </button>
        </FormElem>
      </div>
    </section>
  );
}
