import { useState } from "react";
import { setNewPassword } from "../../store/Auth/Thunks/setNewPassword";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectUserPasswordError,
  selectUserPasswordSuccess,
} from "../../store/Auth/selectors";
import classNames from "classnames";
import { InputPass } from "../../UI/InputPass/InputPass";
import { FormElem } from "../../Components/FormElem/FormElem";

export const Profile = () => {
  const dispatch = useDispatch();
  const initialValidate = {
    validate: true,
    errorMessage: " ",
  };
  const [validate, setValidate] = useState(initialValidate);
  const serverErrorMessage = useSelector((state) =>
    selectUserPasswordError(state)
  );
  const mess = useSelector((state) => selectUserPasswordSuccess(state));
  useEffect(() => {
    if (validate.errorMessage < 5 && form.newPassword.length >= 6) {
      setValidate(initialValidate);
      dispatch(
        setNewPassword({
          pass: form.password,
          id: localStorage.userId / 1,
          newPass: form.newPassword,
        })
      );
      setForm({
        password: "",
        newPassword: "",
        repeat: "",
      });
    }

    setValidate({ ...validate, validate: true });
  }, [validate.errorMessage]);

  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    repeat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleValidate = () => {
    const regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&+=*]{6,30}$/;
    if (form.newPassword !== form.repeat) {
      setValidate({ validate: false, errorMessage: "Пароли не совпадают!" });
    } else if (!regularExpression.test(form.newPassword)) {
      setValidate({
        validate: false,
        errorMessage:
          "Новый пароль должен содержать латинские буквы верхнего и нижнего регистра, цифры и специальные символы и быть длинной от 6 до 30 символов",
      });
    } else if (serverErrorMessage) {
      setValidate({ validate: false, errorMessage: serverErrorMessage });
    } else {
      setValidate({ ...validate, errorMessage: "  ", mess });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleValidate();
  };

  return (
    <div className={styles.profile}>
      <h2 className={styles.title}>Сбросить пароль </h2>
      <FormElem onSubmit={onSubmit}>
        <InputPass
          name={"password"}
          value={form.password}
          label={"Старый пароль"}
          setValue={handleChange}
        />
        <InputPass
          name={"newPassword"}
          value={form.newPassword}
          label={"Новый пароль"}
          setValue={handleChange}
        />
        <InputPass
          name={"repeat"}
          value={form.repeat}
          label={"Повторите пароль"}
          setValue={handleChange}
        />
        <button
          type="submit"
          onClick={(e) => onSubmit(e)}
          className={styles.submit}
        >
          Сохранить
        </button>
        <span
          className={classNames(styles.errorMessage, {
            [styles.successMessage]: validate.mess,
          })}
        >
          {validate.mess ? mess : validate.errorMessage}
        </span>
      </FormElem>
    </div>
  );
};
