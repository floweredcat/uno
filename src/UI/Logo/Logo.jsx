import logo from "../../assets/images/logo.png";
import styles from "./styles.module.css";

export const Logo = () => {
  return (
    <img
      src={logo}
      alt={logo}
      className={styles.form_logo}
    />
  );
};
