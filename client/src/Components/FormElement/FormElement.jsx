import classNames from "classnames";
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
import { authSliceActions } from "../../store/Auth";

export const FormElement = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isValidate, setIsValidate] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => selectUserErrorMessage(state))
  const userAuthSuccess = useSelector((state) =>
    selectUserAuthenticated(state)
  );
  useEffect(() => {
    dispatch(authSliceActions.logout())
  }, [])
  useEffect(() => {
    if (userAuthSuccess) {
      navigate("/cabinet");
    }
  }, [errorMessage, userAuthSuccess]);

  const handleValidate = () => {
    let lastAtPos = email.lastIndexOf("@");
    let lastDotPos = email.lastIndexOf(".");
    if (!email || !password) {
      setIsValidate(false);
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
    }
    else if(!userAuthSuccess) {
        setIsValidate(false)
    } else {
      setIsValidate(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleValidate();
    dispatch(authUserIfUserExist({ email, password }));
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.login_formWrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <img src={logo} alt="logo" className={styles.form_logo} />
        <div className={styles.input_container}>
          <input
            autoComplete="new-password"
            id="login"
            type="text"
            className={classNames(styles.form_input, {
              [styles.form_input__invalid]: !isValidate
            })}
            placeholder=" "
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="login" className={styles.form_label}>
            Логин
          </label>
        </div>
        <div className={styles.input_container}>
          <input
            autoComplete="new-password"
            id="password"
            type={passwordVisible ? "text" : "password"}
            className={classNames(styles.form_input, {
              [styles.form_input__invalid]: !isValidate
            })}
            placeholder=" "
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="password" className={styles.form_label}>
            Пароль
          </label>
          <button
            className={classNames({
              [styles.form_hideButton]: passwordVisible,
              [styles.form_hidePuttonFilled]: !passwordVisible,
            })}
            type="button"
            onClick={togglePasswordVisible}
          ></button>
        </div>
        <span className={styles.errorMessage}>
          {!isValidate ? "Неверный логин или пароль!" : ""}
        </span>
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
