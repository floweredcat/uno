import styles from "./styles.module.css";


export const Option = ({ value, label, onClick=() => {} }) => 
    <option
      className={styles.option}
      value={value}
      onClick={onClick}
    >
      {label}
    </option>