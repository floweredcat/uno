import { nanoid } from "nanoid";
import { Option } from "../Option/Option";
import styles from "./styles.module.css";

export const InputSelect = ({
  mapValues,
  setForm,
  size = 1,
  label,
  value,
  name,
}) => {
  return (
    <div className={styles.input_container}>
      <select
        name={name}
        size={size}
        id={label}
        className={styles.form_input}
        value={value}
        placeholder=" "
        onChange={setForm}
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
