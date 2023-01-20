import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { selectObjectById } from "../../store/Objects/selectors";
import { selectUserDataById } from "../../store/Users/selectors";
import classNames from "classnames";
import styles from "./styles.module.css";

export const UserData = ({ onclick, id, filter = "", userId, selectedRow }) => {
  const object = useSelector((state) => selectObjectById(state, { id }));
  const user = useSelector((state) =>
    selectUserDataById(state, { id: userId })
  );

  const getDiffDates = () => {
    const diff =
      new Date(new Date(object?.ENDDT?.substr(0, object?.ENDDT?.indexOf("T")))) -
      new Date(object?.STARTDT?.substr(0, object?.STARTDT?.indexOf("T")));
    const days = diff / 86400000;
    let months = Math.floor(days / 30);
    return months;
  };
  const getStyleByLeftMonths = () => {
    if (!getDiffDates()) {
      return classNames(styles.table_cell, styles.table_cell__num)
    }
    if (getDiffDates() < 1) {
      return classNames(styles.table_cell, styles.table_cell__num, styles.red);
    }
    if (getDiffDates() === 1) {
      return classNames(
        styles.table_cell,
        styles.table_cell__num,
        styles.yellow
      );
    }
    if (getDiffDates() > 1) {
      return classNames(
        styles.table_cell,
        styles.table_cell__num,
        styles.green
      );
    }
  };

  if (id && !object?.NAME.toString().toLowerCase().includes(filter)) {
    return null;
  }

  return (
    <tr
      className={classNames(styles.table_row, {
        [styles.table_row__selected]: selectedRow
          ? selectedRow === userId
          : false,
      })}
      onDoubleClick={() => (id ? onclick(object.IDSRV) : 0)}
      onClick={() => (id ? 0 : onclick(userId))}
    >
      <td
        key={nanoid()}
        className={id ? getStyleByLeftMonths() : styles.table_cell}
      >
        {id ? object.IDSRV : user?.ID}
      </td>
      <td key={nanoid()} className={styles.table_cell}>
        {id ? object.NAME : user?.NAME}
      </td>
      <td key={nanoid()} className={styles.table_cell}>
        {id ? object.CITY : user?.EMAIL}
      </td>
      <td
        key={nanoid()}
        className={classNames(styles.table_cell, styles.table_cell__num)}
      >
        {id ? object.PHONE : user?.PHONE}
      </td>
      <td
        key={nanoid()}
        className={classNames(styles.table_cell, styles.table_cell__num)}
      >
        {id ? object.DT.substr(0, object.DT.indexOf("T")) : user?.ROLENAME}
      </td>
      <td key={nanoid()} className={styles.table_cell}>
        {id ? object.FRAN_NAME : "UM System Group"}
      </td>
      <td
        key={nanoid()}
        className={classNames(styles.table_cell, styles.table_cell__num)}
      >
        <div className={styles.table_cell__balance}>
          {id
            ? object.AMOUNT
            : user?.BALANCE
            ? user.BALANCE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : 0}
        </div>
      </td>
    </tr>
  );
};
