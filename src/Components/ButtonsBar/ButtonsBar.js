import addIMG from "../../assets/images/add.svg";
import editIMG from "../../assets/images/edit.svg";
import deleteIMG from "../../assets/images/delete.svg";
import { nanoid } from "nanoid";
import classNames from "classnames";
import styles from "./styles.module.css";

export const ButtonBar = ({
  onClicks,
  disabled = false,
  images = [addIMG, editIMG, deleteIMG],
}) => {
  return (
    <div className={classNames(styles.bar_container)}>
      {onClicks.map((onClick, idx) => {
        return (
          <button
            type="button"
            onClick={() => onClick()}
            className={
              idx === 2
                ? classNames(
                    styles.bar_button,
                    styles.bar_button__delete,
                    styles.button
                  )
                : classNames(styles.bar_button, styles.button)
            }
            disabled={idx === 0 ? false : disabled}
            key={nanoid()}>
            <img
              src={images[idx]}
              alt={images[idx]}
              className={styles.bar_buttonImage}
            />
          </button>
        );
      })}
    </div>
  );
};
