import addIMG from "./images/add.svg";
import editIMG from "./images/edit.svg";
import deleteIMG from "./images/delete.svg";
import { nanoid } from "nanoid";
import classNames from "classnames";
import styles from './styles.module.css'
const images = [addIMG, editIMG, deleteIMG];

export const ButtonBar = ({ onClicks, disabled }) => {
  return (
    <div className={classNames(styles.bar_container)}>
      {onClicks.map((onClick, idx) => {
        return (
          <button
            type="button"
            onClick={() => onClick()}
            className={idx === 2 ? classNames(
              styles.bar_button,
              styles.bar_button__delete,
              styles.button
            ) : classNames(styles.bar_button, styles.button)}
            disabled={idx === 0 ? false : disabled}
            key={nanoid()}
          >
            <img src={images[idx]} alt={images[idx]} className={styles.bar_buttonImage} />
          </button>
        );
      })}
    </div>
  );
};
