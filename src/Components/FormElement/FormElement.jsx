import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authUserIfUserExist } from "../../store/Auth/Thunks/authUserIfUserExist";
import {
  selectUserErrorMessage,
  selectUserAuthenticated,
} from "../../store/Auth/selectors";
import logo from "../../assets/images/logo.png";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { InputText } from "../../UI/InputText/InputText.tsx";
import { InputPassWithHide } from "../../UI/InputPassWithHide/InputPassWithHide";
import { isEmail } from "validator";
import { ROUTES } from "../../assets/constants/Fixtires";

export const FormElement = () => {
  const userIdAccess = localStorage.userIdAccess;
  const [validate, setValidate] = useState({
    isValid: true,
    errorMessage: " ",
  });
  const [form, setForm] = useState({ password: "", email: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const isSuccessAuth = useSelector((state) => selectUserAuthenticated(state));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => selectUserErrorMessage(state));
  const user = localStorage.userId;
  useEffect(() => {
    if (user) {
      navigate(userIdAccess != 3 ? ROUTES.users : ROUTES.objects);
    }
    setValidate({ ...validate, isValid: true });
  }, [isSuccessAuth]);

  const handleValidate = () => {
    if (!form.email || !form.password) {
      setValidate({ isValid: false, errorMessage: "Введите логин и пароль!" });
    } else if (!isEmail(form.email)) {
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
    dispatch(authUserIfUserExist(form));
    event.preventDefault();
    handleValidate();
  };

  return (
    <div className={styles.login_formWrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <img src={logo} alt="logo" className={styles.form_logo} />
        <InputText
          label={"Логин"}
          name={"email"}
          value={form.email}
          setValue={handleChange}
        />
        <InputPassWithHide
          name={"password"}
          label={"Пароль"}
          value={form.password}
          setValue={handleChange}
        />
        <span className={styles.errorMessage}>{validate.errorMessage}</span>
        <button className={styles.form_submit} type="submit">
          Войти
        </button>
        <Link to="/forgot" className={styles.form_forget} type="button">
          Забыли пароль?
        </Link>
      </form>
    </div>
  );
};
