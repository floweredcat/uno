import { nanoid } from "nanoid";
import { Option } from "../Option/Option";
import styles from "./styles.module.css";

export const InputSelect = ({ mapValues, setForm, size = 1, label, value }) => {
  return (
    <div className={styles.input_container}>
      <select
        size={size}
        id={label}
        className={styles.form_input}
        value={value}
        placeholder=" "
        onChange={(e) => setForm(e.target.value)}
      >
        {mapValues?.map((el) => (
          <Option key={nanoid()} label={el.label} value={el.value} />
        ))}
      </select>
      <label htmlFor={label} className={styles.form_label__select}>
        {label}
      </label>
    </div>
  );
};
