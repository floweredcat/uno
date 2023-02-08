import styles from "./styles.module.css";

export const ObjectInfoContainer = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
