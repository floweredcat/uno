import styles from "./styles.module.css";

export function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <i className={styles.loader}></i>
      </div>
    </div>
  );
}
