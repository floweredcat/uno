import classNames from "classnames";
import { NavLink, useParams } from "react-router-dom";
import styles from "./styles.module.css";

export const Tab = ({ title, img, link }) => {
  const param = useParams();
  const isActive = Object.values(param)[0].includes(link.substr(1));
  return (
    <NavLink
      to={link}
      type="button"
      className={classNames(styles.tab, styles.button, {
        [styles.tab_active]: isActive,
      })}
    >
      <img src={img} alt="" className={styles.tab_icon}></img>
      <div className={styles.title}>{title}</div>
    </NavLink>
  );
};
