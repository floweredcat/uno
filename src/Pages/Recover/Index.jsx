import classNames from "classnames";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FormElem } from "../../Components/FormElem/FormElem";
import { InputPassWithHide } from "../../UI/InputPassWithHide/InputPassWithHide";
import { Logo } from "../../UI/Logo/Logo";
import styles from "./styles.module.css";

export function Recover() {
  const { hash } = useParams();
  const [form, setForm] = useState({
    pass: "",
    repeatPass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    console.log(hash);
  };

  return (
    <section className={styles.forgot}>
      <div className={styles.forgot_wrapper}>
        <Logo />
        <FormElem onSubmit={onSubmit}>
          <InputPassWithHide
            name={"pass"}
            label={"Новый пароль"}
            value={form.pass}
            setValue={handleChange}
          />
          <InputPassWithHide
            name={"repeatPass"}
            label={"Повторите новый пароль"}
            value={form.repeatPass}
            setValue={handleChange}
          />
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
