import classNames from "classnames";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FormElem } from "../../Components/FormElem/FormElem";
import { InputPassWithHide } from "../../UI/InputPassWithHide/InputPassWithHide";
import { Logo } from "../../UI/Logo/Logo";
import styles from "./styles.module.css";

export function Recover() {
  const { hash } = useParams();
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const onSubmit = () => {};

  return (
    <section className={styles.forgot}>
      <div className={styles.forgot_wrapper}>
        <Logo />
        <FormElem onSubmit={onSubmit}>
          <InputPassWithHide
            label={"Новый пароль"}
            value={pass}
            setValue={setPass}
          />
          <InputPassWithHide
            label={"Повторите новый пароль"}
            value={repeatPass}
            setValue={setRepeatPass}
          />
          <button
            type="submit"
            className={classNames(styles.button, styles.form_submit)}>
            Восстановить пароль
          </button>
        </FormElem>
      </div>
    </section>
  );
}
