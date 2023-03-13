import classNames from "classnames";
import styles from "./styles.module.css";

export const Button = ({ label, type = "button" }) => {
  return (
    <button
      type={type}
      className={classNames(styles.button, styles.form_submit)}
    >
      {label}
    </button>
  );
};
