import styles from "./styles.module.css";

export const Option = ({ value, label }) => {
  return (
    <option
      className={styles.option}
      value={value}
    >
      {label}
    </option>
  );
};
