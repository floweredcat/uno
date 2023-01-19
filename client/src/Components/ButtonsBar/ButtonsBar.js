import addIMG from "./images/add.svg";
import editIMG from "./images/edit.svg";
import deleteIMG from "./images/delete.svg";
import { nanoid } from "nanoid";
const images = [addIMG, editIMG, deleteIMG];

export const ButtonBar = ({ onClicks, disabled, styles }) => {
  return (
    <div className={styles.wrapper}>
      {onClicks.map((onClick, idx) => {
        return (
          <button
            type="button"
            onClick={() => onClick()}
            className={idx === 2 ? styles.delete : styles.button}
            disabled={idx === 0 ? false : disabled}
            key={nanoid()}
          >
            <img src={images[idx]} alt={images[idx]} className={styles.img} />
          </button>
        );
      })}
    </div>
  );
};
