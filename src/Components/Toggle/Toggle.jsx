import styles from "./styles.module.css";

export const Toggle = ({ checked, setValue }) => {
  return (
    <input
      type="checkbox"
      onChange={setValue}
      checked={checked}
      className={styles.toggle}
    />
  );
};
