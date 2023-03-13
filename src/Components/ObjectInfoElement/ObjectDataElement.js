import { nanoid } from "nanoid";
import styles from "./styles.module.css";

export const ObjectInfoElement = ({ objectData }) => {
  const { img, title, content } = objectData;
  return (
    <div className={styles.info_element} key={nanoid()}>
      {img && <img src={img} alt={img} className={styles.icon} />}
      <div className={styles.content_wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
};
