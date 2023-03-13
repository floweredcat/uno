import classNames from "classnames";
import styles from "./styles.module.css";

export const InputRadioPeriod = ({ label, active, setValue }) => {
  return (
    <button
      type="button"
      className={classNames(styles.perion_button, {
        [styles.period_button__active]: active,
      })}
      onClick={setValue}>
      {label}
    </button>
  );
};
