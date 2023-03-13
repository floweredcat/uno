import { useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

export const InputPassWithHide = ({ label, value, setValue, name }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className={styles.input_container}>
      <input
        name={name}
        autoComplete="new-password"
        id={label}
        type={passwordVisible ? "text" : "password"}
        className={styles.form_input}
        placeholder=" "
        value={value}
        onChange={setValue}
      />
      <label htmlFor={label} className={styles.form_label}>
        {label}
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
  );
};
