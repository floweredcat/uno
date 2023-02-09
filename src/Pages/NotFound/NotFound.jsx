import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Упс, такой страницы у нас нет!</h3>
      <h2>404</h2>
      <Link
        to="/cabinet/users"
        className={styles.link}>
        На главную странцу
      </Link>
    </div>
  );
};
