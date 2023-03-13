import styles from "./styles.module.css";

export const InputPhone = ({ label, value, setValue, name }) => {
  return (
    <div className={styles.input_container}>
      <input
        name={name}
        autoComplete="new-password"
        id={label}
        type="number"
        className={styles.form_input}
        placeholder=" "
        value={value}
        onChange={setValue}
      />
      <label htmlFor={label} className={styles.form_label}>
        {label}
      </label>
    </div>
  );
};
