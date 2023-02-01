import classNames from "classnames";
import styles from "./styles.module.css";

export const PackageOption = ({label, checked, setValue}) => {


    return (
        <label
          htmlFor={label}
          className={classNames(styles.switch, {
            [styles.switch__active]: checked,
          })}>
          {label}
          <input
            type="checkbox"
            onChange={setValue}
            checked={checked}
            id={label}
            className={styles.toggle}></input>
        </label>
    )
}
