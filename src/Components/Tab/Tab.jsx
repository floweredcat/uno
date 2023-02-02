import classNames from "classnames";
import styles from './styles.module.css';


export const Tab = ({title, onClick, isActive, img}) => {
    return (
        <button
        type="button"
        className={classNames(styles.tab, styles.button, {
          [styles.tab_active]: isActive,
        })}
        onClick={onClick}
      >
        <img src={img} alt="" className={styles.tab_icon}></img>
        <div>{title}</div>
      </button>
    )
}