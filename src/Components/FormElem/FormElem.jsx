import styles from "./styles.module.css";

export const FormElem = ({ title, onSubmit, children }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </form>
  );
};
