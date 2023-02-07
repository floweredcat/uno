import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUserIfUserExist } from "../../store/Auth/Thunks/authUserIfUserExist";
import {
  selectUserErrorMessage,
  selectUserAuthenticated,
} from "../../store/Auth/selectors";
import logo from "./images/logo.png";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { InputText } from "../../UI/InputText/InputText";
import {InputPassWithHide} from "../../UI/InputPassWithHide/InputPassWithHide"

export const FormElement = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validate, setValidate] = useState({
    isValid: true,
    errorMessage: " ",
  });
  const isSuccessAuth = useSelector((state) => selectUserAuthenticated(state));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => selectUserErrorMessage(state));
  const user = localStorage.userId;
  useEffect(() => {
    if (user) {
      navigate("/cabinet");
    }
    setValidate({ ...validate, isValid: true });
  }, [isSuccessAuth]);

  const handleValidate = () => {
    let lastAtPos = email.lastIndexOf("@");
    let lastDotPos = email.lastIndexOf(".");
    if (!email || !password) {
      setValidate({ isValid: false, errorMessage: "Введите логин и пароль!" });
    } else if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf("@@") === -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
      setValidate({
        isValid: false,
        errorMessage: "Неверный формат электронной почты",
      });
    } else if (errorMessage) {
      setValidate({
        isValid: false,
        errorMessage: "Неверный логин или пароль!",
      });
    } else {
      setValidate({ isValid: true, errorMessage: " " });
    }
  };

  const handleSubmit = (event) => {
    dispatch(authUserIfUserExist({ email, password }));
    event.preventDefault();
    handleValidate();
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.login_formWrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <img src={logo} alt="logo" className={styles.form_logo} />
        <InputText label={"Логин"} value={email} setValue={setEmail} />
        <InputPassWithHide label={"Пароль"} value={password} setValue={setPassword} />
        <span className={styles.errorMessage}>{validate.errorMessage}</span>
        <button className={styles.form_submit} type="submit">
          Войти
        </button>
        <button className={styles.form_forget} type="button">
          Забыли пароль?
        </button>
      </form>
    </div>
  );
};
