import { nanoid } from "nanoid";
import styles from "./styles.module.css";
import classNames from "classnames";

export const UserData = ({ data }) => {
  return data.map((el, idx) => {
    if (idx === 6) {
      return (
        <td
          key={nanoid()}
          className={classNames(styles.table_cell, styles.table_cell__num)}
        >
          <div className={styles.table_cell__balance}>{el}</div>
        </td>
      );
    }
    if ([0, 3, 4, data.length -1].includes(idx)) {
      return (
        <td
          key={nanoid()}
          className={classNames(styles.table_cell, styles.table_cell__num)}
        >
          {el}
        </td>
      );
    }
    return (
      <td className={styles.table_cell} key={nanoid()}>
        {el}
      </td>
    );
  });
};
