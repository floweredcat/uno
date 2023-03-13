import { nanoid } from "nanoid";
import { Option } from "../Option/Option";
import styles from "./styles.module.css";

export const InputSelectTable = ({
  mapValues,
  setForm,
  size = 1,
  label,
  value,
}) => {
  return (
    <div className={styles.input_container}>
      <label className={styles.label}>{value.length == 0 && label}</label>
      <select
        size={size}
        id={label}
        className={styles.form_input}
        value={value}
        onChange={(e) => setForm(e.target.value)}
      >
        {mapValues?.map((el) => (
          <Option key={nanoid()} label={el} value={el} />
        ))}
      </select>
    </div>
  );
};
