import styles from "./styles.module.css";

export const InputRadio = ({ label, value, setValue, checked }) => {
  return (
    <div className={styles.radio_container}>
      <input
        className={styles.radio}
        type="radio"
        value={value}
        onChange={() => setValue(value)}
        checked={checked}
      />
      {label}
      <label className={styles.label_radio}></label>
    </div>
  );
};
