import classNames from "classnames";
import styles from "./styles.module.css";
import { FormElement } from "../../Components/FormElement/FormElement";

export const Auth = () => {
  return (
    <>
      <div className={styles.header}>
        <a
          href="#"
          className={classNames(styles.header_link, styles.link)}>
          <div className={classNames(styles.header_logo, styles.logo)} />
        </a>
      </div>
      <div className={styles.login}>
        <FormElement />
      </div>
    </>
  );
};
